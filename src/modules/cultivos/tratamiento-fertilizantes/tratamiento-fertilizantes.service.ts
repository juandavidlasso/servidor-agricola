import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTratamientoFertilizanteInput } from './dto/create-tratamiento-fertilizante.input';
import { UpdateTratamientoFertilizanteInput } from './dto/update-tratamiento-fertilizante.input';
import { TratamientoFertilizante } from './entities/tratamiento-fertilizante.entity';

@Injectable()
export class TratamientoFertilizantesService {
    constructor(
        @InjectModel(TratamientoFertilizante)
        private readonly tratamientoFertilizanteRepository: typeof TratamientoFertilizante
    ) {}

    async agregarTratamientoFertilizanteService(
        createTratamientoFertilizanteInput: CreateTratamientoFertilizanteInput
    ): Promise<TratamientoFertilizante> {
        try {
            return await this.tratamientoFertilizanteRepository.create(createTratamientoFertilizanteInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarTratamientoFertilizanteService(
        id_trafe: number,
        updateTratamientoFertilizanteInput: UpdateTratamientoFertilizanteInput
    ): Promise<TratamientoFertilizante> {
        try {
            const tratamientoHerbicida = await this.tratamientoFertilizanteRepository.findOne({ where: { id_trafe } });

            if (!tratamientoHerbicida) throw new Error('El tratamiento no esta registrado.');

            return await tratamientoHerbicida.update(updateTratamientoFertilizanteInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarTratamientoFertilizanteService(id_trafe: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.tratamientoFertilizanteRepository.destroy({ where: { id_trafe } }).then((rows) => {
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
