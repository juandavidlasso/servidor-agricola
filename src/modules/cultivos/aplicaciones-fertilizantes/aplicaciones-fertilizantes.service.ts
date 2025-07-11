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
                order: [[{ model: AplicacionFertilizante, as: 'aplicacionFertilizante' }, 'fecha', 'DESC']],
                attributes: [
                    'id_aplicaciones_fertilizantes',
                    'corte_id',
                    'apfe_id',
                    [
                        this.aplicacionesFertilizantesRepository.sequelize.literal(
                            '(SELECT GROUP_CONCAT(IFNULL(s.nombre, "") SEPARATOR "-") FROM suertes s INNER JOIN cortes c ON s.id_suerte = c.suerte_id INNER JOIN aplicaciones_fertilizantes af ON c.id_corte = af.corte_id WHERE af.apfe_id = aplicacionFertilizante.id_apfe)'
                        ),
                        'suertes'
                    ]
                ],
                include: [
                    {
                        model: AplicacionFertilizante,
                        required: true,
                        attributes: ['id_apfe', 'fecha', 'tipo'],
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
