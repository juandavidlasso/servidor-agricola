import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreatePluviometroInput, FilterLluviasInput } from './dto/create-pluviometro.input';
import { Pluviometro } from './entities/pluviometro.entity';
import { AplicacionLluvia } from '../cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';
import { Lluvia } from '../lluvias/entities/lluvia.entity';

@Injectable()
export class PluviometrosService {
    constructor(
        @InjectModel(Pluviometro)
        private readonly pluviometroRepository: typeof Pluviometro
    ) {}

    async agregarPluviometroService(createPluviometroInput: CreatePluviometroInput): Promise<Pluviometro> {
        try {
            return await this.pluviometroRepository.create(createPluviometroInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerPluviometrosYLluviasService(filterLluviasInput: FilterLluviasInput): Promise<Pluviometro[]> {
        try {
            const actualDate = new Date();
            const inicioMes = new Date(
                filterLluviasInput.year === 0 ? actualDate.getFullYear() : filterLluviasInput.year,
                filterLluviasInput.month === 0 ? actualDate.getMonth() : filterLluviasInput.month - 1,
                1
            );
            const finMes = new Date(
                filterLluviasInput.year === 0 ? actualDate.getFullYear() : filterLluviasInput.year,
                filterLluviasInput.month === 0 ? actualDate.getMonth() + 1 : filterLluviasInput.month,
                0
            );
            const formatearFecha = (fecha: Date) => fecha.toISOString().split('T')[0];

            return await this.pluviometroRepository.findAll({
                order: [['nombre', 'ASC']],
                attributes: [
                    'id_pluviometro',
                    'nombre',
                    'suertesAsociadas',
                    [
                        this.pluviometroRepository.sequelize.literal(
                            `(SELECT SUM(cantidad) FROM aplicacion_lluvias INNER JOIN lluvias ON lluvia_id = id_lluvia WHERE pluviometro_id = id_pluviometro AND MONTH(fecha) = ${
                                filterLluviasInput.month === 0 ? actualDate.getMonth() + 1 : filterLluviasInput.month
                            } AND YEAR(fecha) = ${
                                filterLluviasInput.year === 0 ? actualDate.getFullYear() : filterLluviasInput.year
                            } GROUP BY pluviometro_id)`
                        ),
                        'totalMes'
                    ]
                ],
                include: [
                    {
                        model: AplicacionLluvia,
                        required: false,
                        include: [
                            {
                                model: Lluvia,
                                required: true,
                                where: {
                                    fecha: {
                                        [Op.between]: [formatearFecha(inicioMes), formatearFecha(finMes)]
                                    }
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

    async obtenerLluviasYearService(year: number): Promise<Pluviometro[]> {
        try {
            return await this.pluviometroRepository.findAll({
                order: [['nombre', 'ASC']],
                attributes: [
                    'id_pluviometro',
                    'nombre',
                    'suertesAsociadas',
                    [
                        this.pluviometroRepository.sequelize.literal(
                            `(SELECT SUM(cantidad) FROM aplicacion_lluvias INNER JOIN lluvias ON lluvia_id = id_lluvia WHERE pluviometro_id = id_pluviometro AND YEAR(fecha) = ${year} GROUP BY pluviometro_id)`
                        ),
                        'totalMes'
                    ]
                ],
                include: [
                    {
                        model: AplicacionLluvia,
                        required: false,
                        include: [
                            {
                                model: Lluvia,
                                required: true,
                                where: {
                                    fecha: {
                                        [Op.and]: [
                                            this.pluviometroRepository.sequelize.where(
                                                this.pluviometroRepository.sequelize.fn(
                                                    'YEAR',
                                                    this.pluviometroRepository.sequelize.col(
                                                        'listAplicacionesLluvias.lluviaPadre.fecha'
                                                    )
                                                ),
                                                '=',
                                                year
                                            )
                                        ]
                                    }
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
}
