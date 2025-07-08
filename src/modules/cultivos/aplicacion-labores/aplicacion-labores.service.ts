import { Injectable } from '@nestjs/common';
import { CreateAplicacionLaboresInput } from './dto/create-aplicacion-labores.input';
import { InjectModel } from '@nestjs/sequelize';
import { AplicacionLabores } from './entities/aplicacion-labores.entity';
import { Labores } from '../labores/entities/labores.entity';

@Injectable()
export class AplicacionLaboresService {
    constructor(
        @InjectModel(AplicacionLabores)
        private readonly aplicacionLaboresRepository: typeof AplicacionLabores,
        @InjectModel(Labores)
        private readonly laboresRepository: typeof Labores
    ) {}

    async agregarAplicacionLaboresService(createAplicacionLaboresInput: CreateAplicacionLaboresInput[]): Promise<number[]> {
        try {
            const aplicacionesRegistradas: number[] = [];
            for (let index = 0; index < createAplicacionLaboresInput.length; index++) {
                const aplicacionRegistered = await this.aplicacionLaboresRepository.findOne({
                    where: {
                        corte_id: createAplicacionLaboresInput[index].corte_id,
                        labor_id: createAplicacionLaboresInput[index].labor_id
                    }
                });

                if (!aplicacionRegistered) {
                    await this.aplicacionLaboresRepository.create(createAplicacionLaboresInput[index]);
                    aplicacionesRegistradas.push(createAplicacionLaboresInput[index].labor_id);
                }
            }
            return aplicacionesRegistradas;
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerAplicacionesLaboresService(id: number): Promise<AplicacionLabores[]> {
        try {
            return await this.aplicacionLaboresRepository.findAll({
                include: [
                    {
                        model: Labores,
                        required: true,
                        attributes: [
                            'id_labor',
                            'fecha',
                            'actividad',
                            'equipo',
                            'estado',
                            'pases',
                            'aplico',
                            'costo',
                            'nota',
                            [
                                this.laboresRepository.sequelize.literal(
                                    '(SELECT GROUP_CONCAT(IFNULL(s.nombre, "") SEPARATOR "-") FROM suertes s INNER JOIN cortes c ON s.id_suerte = c.suerte_id INNER JOIN aplicacion_labores al ON c.id_corte = al.corte_id WHERE al.labor_id = labor.id_labor)'
                                ),
                                'suertes'
                            ]
                        ]
                    }
                ],
                where: { corte_id: id }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionLaboresService(id_aplicacion_labores: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionLaboresRepository.destroy({ where: { id_aplicacion_labores } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
