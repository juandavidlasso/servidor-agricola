import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCosechaInput } from './dto/create-cosecha.input';
import { UpdateCosechaInput } from './dto/update-cosecha.input';
import { Cosecha } from './entities/cosecha.entity';
import { Corte } from '../cortes/entities/corte.entity';
import { Tablon } from '../tablones/entities/tablon.entity';

@Injectable()
export class CosechasService {
    constructor(
        @InjectModel(Cosecha)
        private readonly cosechaRepository: typeof Cosecha,
        @InjectModel(Tablon)
        private readonly tablonRepository: typeof Tablon
    ) {}

    async agregarCosechaService(createCosechaInput: CreateCosechaInput): Promise<Cosecha> {
        try {
            return await this.cosechaRepository.create(createCosechaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerCosechaCorteService(id_corte: number): Promise<Cosecha> {
        try {
            const cosecha = await this.cosechaRepository.findOne({ where: { corte_id: id_corte } });

            if (!cosecha) throw new Error('No hay cosecha registrada');

            const tablones = await this.tablonRepository.count({ where: { corte_id: id_corte } });

            if (tablones === 0) throw new Error('No hay tablones registrados');

            return await this.cosechaRepository.findOne({
                where: { corte_id: id_corte },
                include: [
                    {
                        model: Corte,
                        required: true,
                        include: [
                            {
                                model: Tablon,
                                required: true
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarCosechaService(id_cosecha: number, updateCosechaInput: UpdateCosechaInput): Promise<Cosecha> {
        try {
            const cosecha = await this.cosechaRepository.findOne({ where: { id_cosecha } });

            if (!cosecha) throw new Error('La cosecha no esta registrada.');

            return await cosecha.update(updateCosechaInput);
        } catch (error) {
            throw new Error(error);
        }
    }
}
