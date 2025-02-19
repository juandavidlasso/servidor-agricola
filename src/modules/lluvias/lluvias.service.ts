import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { CreateLluviaInput } from './dto/create-lluvia.input';
import { UpdateLluviaInput } from './dto/update-lluvia.input';
import { Lluvia } from './entities/lluvia.entity';
import { AplicacionLluvia } from '../cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';

@Injectable()
export class LluviasService {
    constructor(
        @InjectModel(Lluvia)
        private readonly lluviaRepository: typeof Lluvia,
        @InjectModel(AplicacionLluvia)
        private readonly aplicacionLluviaRepository: typeof AplicacionLluvia
    ) {}

    async agregarLluviaService(createLluviaInput: CreateLluviaInput[]): Promise<number[]> {
        try {
            const aplicacionesRegistradas: number[] = [];
            for (let index = 0; index < createLluviaInput.length; index++) {
                const lluvia = await this.lluviaRepository.create({
                    fecha: createLluviaInput[index].fecha,
                    cantidad: createLluviaInput[index].cantidad
                });
                if (lluvia.dataValues) {
                    const aplicacionLluvia = await this.aplicacionLluviaRepository.create({
                        pluviometro_id: createLluviaInput[index].pluviometro_id,
                        lluvia_id: lluvia.dataValues.id_lluvia
                    });
                    aplicacionesRegistradas.push(aplicacionLluvia.dataValues.id_aplicacion_lluvia);
                }
            }
            return aplicacionesRegistradas;
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
