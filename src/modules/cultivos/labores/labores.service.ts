import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateLaboresInput } from './dto/create-labores.input';
import { UpdateLaboresInput } from './dto/update-labores.input';
import { Labores } from './entities/labores.entity';

@Injectable()
export class LaboresService {
    constructor(
        @InjectModel(Labores)
        private readonly laboresRepository: typeof Labores
    ) {}

    async agregarLaborService(createLaboresInput: CreateLaboresInput): Promise<Labores> {
        try {
            return await this.laboresRepository.create(createLaboresInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerLaboresService(): Promise<Labores[]> {
        try {
            return await this.laboresRepository.findAll({
                order: [['fecha', 'DESC']]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarLaborService(id_labor: number, updateLaboreInput: UpdateLaboresInput): Promise<Labores> {
        try {
            const labor = await this.laboresRepository.findOne({ where: { id_labor } });

            if (!labor) throw new Error('La labor no esta registrada.');

            return await labor.update(updateLaboreInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarLaborService(id_labor: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.laboresRepository.destroy({ where: { id_labor } }).then((rows) => {
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
