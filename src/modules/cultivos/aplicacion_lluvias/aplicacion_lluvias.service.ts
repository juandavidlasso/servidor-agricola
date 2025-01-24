import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { CreateAplicacionLluviaInput } from './dto/create-aplicacion_lluvia.input';
import { AplicacionLluvia } from './entities/aplicacion_lluvia.entity';

@Injectable()
export class AplicacionLluviasService {
    @InjectModel(AplicacionLluvia)
    private readonly aplicacionLluviaRepository: typeof AplicacionLluvia;

    async agregarAplicacionLluviaService(createAplicacionLluviaInput: CreateAplicacionLluviaInput[]): Promise<number[]> {
        try {
            let aplicacionesRegistradas: number[] = [];
            for (let index = 0; index < createAplicacionLluviaInput.length; index++) {
                const aplicacionRegistered = await this.aplicacionLluviaRepository.findOne({
                    where: {
                        pluviometro_id: createAplicacionLluviaInput[index].pluviometro_id,
                        lluvia_id: createAplicacionLluviaInput[index].lluvia_id
                    }
                });

                if (!aplicacionRegistered) {
                    await this.aplicacionLluviaRepository.create(createAplicacionLluviaInput[index]);
                    aplicacionesRegistradas.push(createAplicacionLluviaInput[index].lluvia_id);
                }
            }
            return aplicacionesRegistradas;
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionLluviaService(id_aplicacion_lluvia: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionLluviaRepository.destroy({ where: { id_aplicacion_lluvia } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerResumenLluviasYearService(year: number): Promise<AplicacionLluvia[]> {
        try {
            return await this.aplicacionLluviaRepository.sequelize.query(
                `SELECT pluviometro_id, MONTH(fecha) AS fecha, SUM(cantidad) AS cantidad FROM Aplicacion_lluvias INNER JOIN Lluvias ON Aplicacion_lluvias.lluvia_id = Lluvias.id_lluvia WHERE YEAR(fecha) = :fecano GROUP BY pluviometro_id, YEAR(fecha), MONTH(fecha)`,
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

    async obtenerResumenPluviometroYearService(year: number): Promise<AplicacionLluvia[]> {
        try {
            return await this.aplicacionLluviaRepository.sequelize.query(
                `SELECT aplicacion_lluvias.pluviometro_id, SUM(lluvias.cantidad) AS cantidad FROM lluvias JOIN aplicacion_lluvias ON lluvias.id_lluvia = aplicacion_lluvias.lluvia_id WHERE YEAR(lluvias.fecha) = :fecano GROUP BY aplicacion_lluvias.pluviometro_id`,
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
