import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInsumoInput } from './dto/create-insumo.input';
import { UpdateInsumoInput } from './dto/update-insumo.input';
import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumosService {
    constructor(
        @InjectModel(Insumo)
        private readonly insumoRepository: typeof Insumo
    ) {}

    async agregarInsumoService(createInsumoInput: CreateInsumoInput): Promise<Insumo> {
        try {
            return await this.insumoRepository.create(createInsumoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerInsumosService(): Promise<Insumo[]> {
        try {
            return await this.insumoRepository.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarInsumoService(idInsumo: number, updateInsumoInput: UpdateInsumoInput): Promise<Insumo> {
        try {
            const insumo = await this.insumoRepository.findOne({ where: { idInsumo } });

            if (!insumo) throw new Error('El insumo no esta registrado');

            return await insumo.update(updateInsumoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarInsumoService(idInsumo: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.insumoRepository.destroy({ where: { idInsumo } }).then((rows) => {
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
