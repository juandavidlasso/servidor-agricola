import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import { CreateLluviaInput, FilterLluviaInput, FilterLluviaMesYearInput } from './dto/create-lluvia.input';
import { UpdateLluviaInput } from './dto/update-lluvia.input';
import { Lluvia } from './entities/lluvia.entity';
import { Pluviometro } from '../pluviometros/entities/pluviometro.entity';
import { AplicacionLluvia } from '../cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';

@Injectable()
export class LluviasService {
    constructor(
        @InjectModel(Lluvia)
        private readonly lluviaRepository: typeof Lluvia,
        @InjectModel(Pluviometro)
        private readonly pluviometroRepository: typeof Pluviometro
    ) {}

    async agregarLluviaService(createLluviaInput: CreateLluviaInput): Promise<Lluvia> {
        try {
            return await this.lluviaRepository.create(createLluviaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarLluviaService(id_lluvia: number, updateLluviaInput: UpdateLluviaInput): Promise<Lluvia> {
        try {
            const lluvia = await this.lluviaRepository.findOne({ where: { id_lluvia } });

            if (!lluvia) throw new Error('La lluvia no esta registrada');

            return await lluvia.update(updateLluviaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarLluviaService(id_lluvia: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.lluviaRepository.destroy({ where: { id_lluvia } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerLluviasService(): Promise<Lluvia[]> {
        try {
            return await this.lluviaRepository.findAll({
                order: [['fecha', 'DESC']]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerLluviasPorPluviometroService(filterLluviaInput: FilterLluviaInput): Promise<Lluvia[]> {
        try {
            if (filterLluviaInput.inicial !== 0 && filterLluviaInput.final === 0) {
                return await this.lluviaRepository.sequelize.query(
                    `SELECT id_lluvia, fecha, cantidad FROM Lluvias JOIN aplicacion_lluvias ON id_lluvia = lluvia_id WHERE EXTRACT(MONTH FROM fecha)=:fechaInicial AND EXTRACT(YEAR FROM fecha)=:fechaYear AND pluviometro_id=:idPluviometro ORDER BY EXTRACT(MONTH FROM fecha), EXTRACT(DAY FROM fecha) ASC;`,
                    {
                        replacements: {
                            fechaInicial: filterLluviaInput.inicial,
                            fechaYear: filterLluviaInput.year,
                            idPluviometro: filterLluviaInput.id_pluviometro
                        },
                        type: QueryTypes.SELECT
                    }
                );
            } else if (filterLluviaInput.inicial !== 0 && filterLluviaInput.final !== 0) {
                return await this.lluviaRepository.sequelize.query(
                    `SELECT id_lluvia, fecha, cantidad FROM Lluvias JOIN aplicacion_lluvias ON id_lluvia = lluvia_id WHERE EXTRACT(MONTH FROM fecha)>=:fechaInicial AND EXTRACT(MONTH FROM fecha)<=:fechaFinal AND EXTRACT(YEAR FROM fecha)=:fechaYear AND pluviometro_id=:idPluviometro ORDER BY EXTRACT(MONTH FROM fecha), EXTRACT(DAY FROM fecha) ASC;`,
                    {
                        replacements: {
                            fechaInicial: filterLluviaInput.inicial,
                            fechaFinal: filterLluviaInput.final,
                            fechaYear: filterLluviaInput.year,
                            idPluviometro: filterLluviaInput.id_pluviometro
                        },
                        type: QueryTypes.SELECT
                    }
                );
            } else if (filterLluviaInput.inicial === 0 && filterLluviaInput.final === 0) {
                return await this.lluviaRepository.sequelize.query(
                    `SELECT id_lluvia, fecha, cantidad FROM Lluvias JOIN aplicacion_lluvias ON id_lluvia = lluvia_id WHERE EXTRACT(YEAR FROM fecha)=:fechaYear AND pluviometro_id=:idPluviometro ORDER BY EXTRACT(MONTH FROM fecha), EXTRACT(DAY FROM fecha) ASC;`,
                    {
                        replacements: {
                            fechaYear: filterLluviaInput.year,
                            idPluviometro: filterLluviaInput.id_pluviometro
                        },
                        type: QueryTypes.SELECT
                    }
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerLluviasMesActualService(): Promise<Pluviometro[]> {
        try {
            return await this.pluviometroRepository.findAll({
                order: [['nombre', 'ASC']],
                attributes: [
                    'id_pluviometro',
                    'nombre',
                    [
                        this.pluviometroRepository.sequelize.literal(
                            `(SELECT SUM(cantidad) FROM aplicacion_lluvias INNER JOIN lluvias ON lluvia_id = id_lluvia WHERE pluviometro_id = id_pluviometro AND MONTH(fecha) = MONTH(NOW()) AND YEAR(fecha) = YEAR(NOW()) GROUP BY pluviometro_id)`
                        ),
                        'suertesAsociadas'
                    ]
                ],
                include: [
                    {
                        model: AplicacionLluvia,
                        required: true,
                        attributes: { exclude: ['fecha', 'cantidad'] },
                        include: [
                            {
                                model: Lluvia,
                                required: true,
                                where: {
                                    [Op.and]: [
                                        this.pluviometroRepository.sequelize.literal(
                                            'MONTH(fecha) = MONTH(NOW()) AND YEAR(fecha) = YEAR(NOW())'
                                        )
                                    ]
                                }
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerLluviasMesYearService(filterLluviaMesYearInput: FilterLluviaMesYearInput): Promise<Pluviometro[]> {
        try {
            return await this.pluviometroRepository.findAll({
                order: [['nombre', 'ASC']],
                attributes: [
                    'id_pluviometro',
                    'nombre',
                    [
                        this.pluviometroRepository.sequelize.literal(
                            `(SELECT SUM(cantidad) FROM aplicacion_lluvias INNER JOIN lluvias ON lluvia_id = id_lluvia WHERE id_pluviometro=pluviometro_id AND date_format(fecha, '%m') = ${filterLluviaMesYearInput.month} AND date_format(fecha, '%Y') = ${filterLluviaMesYearInput.year} GROUP BY pluviometro_id)`
                        ),
                        'suertesAsociadas'
                    ]
                ],
                include: [
                    {
                        model: AplicacionLluvia,
                        required: true,
                        attributes: { exclude: ['fecha', 'cantidad'] },
                        include: [
                            {
                                model: Lluvia,
                                required: true,
                                where: {
                                    [Op.and]: [
                                        this.pluviometroRepository.sequelize.literal(
                                            `date_format(fecha, '%m') = ${filterLluviaMesYearInput.month} AND date_format(fecha, '%Y') = ${filterLluviaMesYearInput.year}`
                                        )
                                    ]
                                }
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerPromedioLluviasService(year: number): Promise<Lluvia[]> {
        try {
            return await this.lluviaRepository.sequelize.query(
                `SELECT MONTH(lluvias.fecha) AS fecha, SUM(lluvias.cantidad) AS cantidad FROM lluvias JOIN aplicacion_lluvias ON lluvias.id_lluvia = aplicacion_lluvias.lluvia_id JOIN pluviometros ON aplicacion_lluvias.pluviometro_id = pluviometros.id_pluviometro WHERE date_format(lluvias.fecha, '%Y') = :fecano AND pluviometros.nombre != 8 GROUP BY MONTH(lluvias.fecha)`,
                {
                    replacements: {
                        fecano: year
                    },
                    type: QueryTypes.SELECT
                }
            );
        } catch (error) {
            throw new Error(error);
        }
    }
}
