import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAplicacionesFertilizanteInput } from './dto/create-aplicaciones-fertilizante.input';
import { AplicacionesFertilizante } from './entities/aplicaciones-fertilizante.entity';
import { AplicacionFertilizante } from '../aplicacion-fertilizantes/entities/aplicacion-fertilizante.entity';
import { TratamientoFertilizante } from '../tratamiento-fertilizantes/entities/tratamiento-fertilizante.entity';

@Injectable()
export class AplicacionesFertilizantesService {
    constructor(
        @InjectModel(AplicacionesFertilizante)
        private readonly aplicacionesFertilizantesRepository: typeof AplicacionesFertilizante
    ) {}

    async agregarAplicacionesFertilizantesService(
        createAplicacionesFertilizanteInput: CreateAplicacionesFertilizanteInput[]
    ): Promise<number[]> {
        let aplicacionesRegistradas: number[] = [];
        for (let index = 0; index < createAplicacionesFertilizanteInput.length; index++) {
            const aplicacionRegistered = await this.aplicacionesFertilizantesRepository.findOne({
                where: {
                    corte_id: createAplicacionesFertilizanteInput[index].corte_id,
                    apfe_id: createAplicacionesFertilizanteInput[index].apfe_id
                }
            });

            if (!aplicacionRegistered) {
                await this.aplicacionesFertilizantesRepository.create(createAplicacionesFertilizanteInput[index]);
                aplicacionesRegistradas.push(createAplicacionesFertilizanteInput[index].apfe_id);
            }
        }
        return aplicacionesRegistradas;
    }

    async obtenerAplicacionesFertilizantesCorteService(corte_id: number): Promise<AplicacionesFertilizante[]> {
        try {
            return await this.aplicacionesFertilizantesRepository.findAll({
                include: [
                    {
                        model: AplicacionFertilizante,
                        required: true,
                        include: [
                            {
                                model: TratamientoFertilizante,
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

    async eliminarAplicacionesFertilizantesService(id_aplicaciones_fertilizantes: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionesFertilizantesRepository
                .destroy({ where: { id_aplicaciones_fertilizantes } })
                .then((rows) => {
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
