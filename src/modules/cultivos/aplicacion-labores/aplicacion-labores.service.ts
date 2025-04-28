import { Injectable } from '@nestjs/common';
import { CreateAplicacionLaboresInput } from './dto/create-aplicacion-labores.input';
import { InjectModel } from '@nestjs/sequelize';
import { AplicacionLabores } from './entities/aplicacion-labores.entity';
import { Labores } from '../labores/entities/labores.entity';

@Injectable()
export class AplicacionLaboresService {
    constructor(
        @InjectModel(AplicacionLabores)
        private readonly aplicacionLaboresRepository: typeof AplicacionLabores
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
                        attributes: ['id_labor', 'fecha', 'actividad', 'equipo', 'estado', 'pases', 'aplico', 'costo', 'nota']
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
