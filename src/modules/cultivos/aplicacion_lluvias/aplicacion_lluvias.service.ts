import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { CreateAplicacionLluviaInput } from './dto/create-aplicacion_lluvia.input';
import { AplicacionLluvia } from './entities/aplicacion_lluvia.entity';

@Injectable()
export class AplicacionLluviasService {
    @InjectModel(AplicacionLluvia)
    private readonly aplicacionLluviaRepository: typeof AplicacionLluvia;

    async agregarAplicacionLluviaService(createAplicacionLluviaInput: CreateAplicacionLluviaInput): Promise<AplicacionLluvia> {
        try {
            return await this.aplicacionLluviaRepository.create(createAplicacionLluviaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionLluviaService(id_aplicacion_lluvia: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionLluviaRepository.destroy({ where: { lluvia_id: id_aplicacion_lluvia } }).then((rows) => {
                if (rows === 1 || rows >= 1) {
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
                `SELECT pluviometro_id, MONTH(fecha) AS fecha, SUM(cantidad) AS cantidad FROM aplicacion_lluvias INNER JOIN lluvias ON aplicacion_lluvias.lluvia_id = lluvias.id_lluvia WHERE YEAR(fecha) = :fecano GROUP BY pluviometro_id, YEAR(fecha), MONTH(fecha)`,
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
