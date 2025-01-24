import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMaquinariaInput } from './dto/create-maquinaria.input';
import { UpdateMaquinariaInput } from './dto/update-maquinaria.input';
import { Maquinaria } from './entities/maquinaria.entity';

@Injectable()
export class MaquinariaService {
    constructor(
        @InjectModel(Maquinaria)
        private readonly maquinariaRepository: typeof Maquinaria
    ) {}

    async agregarMaquinariaService(createMaquinariaInput: CreateMaquinariaInput): Promise<Maquinaria> {
        try {
            return await this.maquinariaRepository.create(createMaquinariaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerMaquinariasService(): Promise<Maquinaria[]> {
        try {
            return await this.maquinariaRepository.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarMaquinariaService(idMaquinaria: number, updateMaquinariaInput: UpdateMaquinariaInput): Promise<Maquinaria> {
        try {
            const maquinaria = await this.maquinariaRepository.findOne({ where: { idMaquinaria } });

            if (!maquinaria) throw new Error('La maquinaria no esta registrada');

            return await maquinaria.update(updateMaquinariaInput);
        } catch (error) {
            throw new Error(error);
        }
    }
}
