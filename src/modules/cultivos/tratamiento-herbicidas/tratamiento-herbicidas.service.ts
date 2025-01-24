import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTratamientoHerbicidaInput } from './dto/create-tratamiento-herbicida.input';
import { UpdateTratamientoHerbicidaInput } from './dto/update-tratamiento-herbicida.input';
import { TratamientoHerbicida } from './entities/tratamiento-herbicida.entity';

@Injectable()
export class TratamientoHerbicidasService {
    constructor(
        @InjectModel(TratamientoHerbicida)
        private readonly tratamientoHerbicidaRepository: typeof TratamientoHerbicida
    ) {}

    async agregarTratamientoHerbicidaService(
        createTratamientoHerbicidaInput: CreateTratamientoHerbicidaInput
    ): Promise<TratamientoHerbicida> {
        try {
            return await this.tratamientoHerbicidaRepository.create(createTratamientoHerbicidaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarTratamientoHerbicidaService(
        id_trahe: number,
        updateTratamientoHerbicidaInput: UpdateTratamientoHerbicidaInput
    ) {
        try {
            const tratamientoHerbicida = await this.tratamientoHerbicidaRepository.findOne({ where: { id_trahe } });

            if (!tratamientoHerbicida) throw new Error('El tratamiento no esta registrado.');

            return await tratamientoHerbicida.update(updateTratamientoHerbicidaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarTratamientoHerbicidaService(id_trahe: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.tratamientoHerbicidaRepository.destroy({ where: { id_trahe } }).then((rows) => {
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
