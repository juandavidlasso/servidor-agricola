import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAplicacionesHerbicidaInput } from './dto/create-aplicaciones_herbicida.input';
import { AplicacionesHerbicida } from './entities/aplicaciones_herbicida.entity';
import { AplicacionHerbicida } from '../aplicacion-herbicidas/entities/aplicacion-herbicida.entity';
import { TratamientoHerbicida } from '../tratamiento-herbicidas/entities/tratamiento-herbicida.entity';

@Injectable()
export class AplicacionesHerbicidasService {
    constructor(
        @InjectModel(AplicacionesHerbicida)
        private readonly aplicacionesHerbicidasRepository: typeof AplicacionesHerbicida
    ) {}

    async agregarAplicacionesHerbicidasService(
        createAplicacionesHerbicidaInput: CreateAplicacionesHerbicidaInput[]
    ): Promise<number[]> {
        let aplicacionesRegistradas: number[] = [];
        for (let index = 0; index < createAplicacionesHerbicidaInput.length; index++) {
            const aplicacionRegistered = await this.aplicacionesHerbicidasRepository.findOne({
                where: {
                    corte_id: createAplicacionesHerbicidaInput[index].corte_id,
                    aphe_id: createAplicacionesHerbicidaInput[index].aphe_id
                }
            });

            if (!aplicacionRegistered) {
                await this.aplicacionesHerbicidasRepository.create(createAplicacionesHerbicidaInput[index]);
                aplicacionesRegistradas.push(createAplicacionesHerbicidaInput[index].aphe_id);
            }
        }
        return aplicacionesRegistradas;
    }

    async obtenerAplicacionesHerbicidasCorteService(corte_id: number): Promise<AplicacionesHerbicida[]> {
        try {
            return await this.aplicacionesHerbicidasRepository.findAll({
                order: [[{ model: AplicacionHerbicida, as: 'aplicacionHerbicida' }, 'fecha', 'DESC']],
                include: [
                    {
                        model: AplicacionHerbicida,
                        required: true,
                        include: [
                            {
                                model: TratamientoHerbicida,
                                required: false
                            }
                        ]
                    }
                ],
                where: { corte_id }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionesHerbicidasService(id_aplicaciones_herbicidas: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionesHerbicidasRepository.destroy({ where: { id_aplicaciones_herbicidas } }).then((rows) => {
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
