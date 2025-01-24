import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateCorteInput } from './dto/create-corte.input';
import { UpdateCorteInput } from './dto/update-corte.input';
import { Corte } from './entities/corte.entity';
import { Suerte } from '../suertes/entities/suerte.entity';
import { Cosecha } from '../cosechas/entities/cosecha.entity';
import { Op } from 'sequelize';

@Injectable()
export class CortesService {
    constructor(
        @InjectModel(Corte)
        private readonly corteRepository: typeof Corte
    ) {}

    async agregarCorteService(createCorteInput: CreateCorteInput): Promise<Corte> {
        try {
            return await this.corteRepository.create(createCorteInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerCortesRenovadosService(nombre: string): Promise<Corte[]> {
        try {
            return await this.corteRepository.findAll({
                attributes: [
                    'id_corte',
                    'numero',
                    'fecha_inicio',
                    'fecha_siembra',
                    'fecha_corte',
                    'activo',
                    'estado',
                    'suerte_id'
                ],
                include: [
                    {
                        model: Suerte,
                        as: 'suertePadre',
                        required: true,
                        attributes: ['id_suerte', 'nombre'],
                        where: {
                            nombre: nombre
                        }
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerCortesPorSuerteService(id_suerte: number): Promise<number> {
        try {
            return await this.corteRepository.count({ where: { suerte_id: id_suerte } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerCorteService(id_corte: number): Promise<Corte> {
        try {
            const corte = await this.corteRepository.findOne({ where: { id_corte } });

            if (!corte) throw new Error('El corte no esta registrado.');

            return corte;
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarCorteService(id_corte: number, updateCorteInput: UpdateCorteInput): Promise<Corte> {
        try {
            const corte = await this.corteRepository.findOne({ where: { id_corte } });

            if (!corte) throw new Error('El corte no esta registrado.');

            return await corte.update(updateCorteInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerCorteActualService(id_suerte: number): Promise<Corte> {
        try {
            const corte = await this.corteRepository.findOne({ where: { suerte_id: id_suerte } });

            if (!corte) throw new Error('No hay cortes registrados.');

            const corteActual = await this.corteRepository.findOne({
                where: {
                    suerte_id: id_suerte,
                    activo: true
                }
            });
            if (!corteActual) throw new Error('No hay corte actual.');
            return corteActual;
        } catch (error) {
            throw new Error(error);
        }
    }
}
