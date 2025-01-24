import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTratamientoPlagasInput } from './dto/create-tratamiento-plagas.input';
import { UpdateTratamientoPlagasInput } from './dto/update-tratamiento-plagas.input';
import { TratamientoPlagas } from './entities/tratamiento-plagas.entity';

@Injectable()
export class TratamientoPlagasService {
    constructor(
        @InjectModel(TratamientoPlagas)
        private readonly tratamientoPlagasRepository: typeof TratamientoPlagas
    ) {}

    async agregarTratamientoPlagasService(
        createTratamientoPlagasInput: CreateTratamientoPlagasInput
    ): Promise<TratamientoPlagas> {
        try {
            return await this.tratamientoPlagasRepository.create(createTratamientoPlagasInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerTratamientoPlagasService(): Promise<TratamientoPlagas[]> {
        try {
            return await this.tratamientoPlagasRepository.findAll({
                order: [['producto', 'DESC']]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarTratamientoPlagasService(
        id_trapl: number,
        updateTratamientoPlagasInput: UpdateTratamientoPlagasInput
    ): Promise<TratamientoPlagas> {
        try {
            const tratamientoPlaga = await this.tratamientoPlagasRepository.findOne({ where: { id_trapl } });

            if (!tratamientoPlaga) throw new Error('El tratamiento no esta registrado.');

            return await tratamientoPlaga.update(updateTratamientoPlagasInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarTratamientoPlagasService(id_trapl: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.tratamientoPlagasRepository.destroy({ where: { id_trapl } }).then((rows) => {
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
