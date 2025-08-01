import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateLaboresInput } from './dto/create-labores.input';
import { UpdateLaboresInput } from './dto/update-labores.input';
import { Labores } from './entities/labores.entity';
import { AplicacionLabores } from '../aplicacion-labores/entities/aplicacion-labores.entity';

@Injectable()
export class LaboresService {
    constructor(
        @InjectModel(Labores)
        private readonly laboresRepository: typeof Labores,
        @InjectModel(AplicacionLabores)
        private readonly aplicacionLaboresRepository: typeof AplicacionLabores
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
                order: [['fecha', 'DESC']],
                attributes: [
                    'id_labor',
                    'fecha',
                    'actividad',
                    'equipo',
                    'estado',
                    'pases',
                    'aplico',
                    'costo',
                    'nota',
                    [
                        this.laboresRepository.sequelize.literal(
                            '(SELECT GROUP_CONCAT(IFNULL(s.nombre, "") SEPARATOR "-") FROM suertes s INNER JOIN cortes c ON s.id_suerte = c.suerte_id INNER JOIN aplicacion_labores al ON c.id_corte = al.corte_id INNER JOIN labores l ON al.labor_id = l.id_labor WHERE l.id_labor = Labores.id_labor)'
                        ),
                        'suertes'
                    ]
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarLaborService(id_labor: number, updateLaboreInput: UpdateLaboresInput): Promise<Labores> {
        try {
            const labor = await this.laboresRepository.findOne({
                attributes: ['id_labor', 'fecha', 'actividad', 'equipo', 'estado', 'pases', 'aplico', 'costo', 'nota'],
                where: { id_labor }
            });

            if (!labor) throw new Error('La labor no esta registrada.');

            return await labor.update(updateLaboreInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarLaborService(id_labor: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            await this.aplicacionLaboresRepository.destroy({ where: { labor_id: id_labor } });
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
