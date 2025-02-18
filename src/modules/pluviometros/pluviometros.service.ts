import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreatePluviometroInput } from './dto/create-pluviometro.input';
import { Pluviometro } from './entities/pluviometro.entity';
import { AplicacionLluvia } from '../cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';
import { Lluvia } from '../lluvias/entities/lluvia.entity';

@Injectable()
export class PluviometrosService {
    constructor(
        @InjectModel(Pluviometro)
        private readonly pluviometroRepository: typeof Pluviometro
    ) {}

    async agregarPluviometroService(createPluviometroInput: CreatePluviometroInput): Promise<Pluviometro> {
        try {
            return await this.pluviometroRepository.create(createPluviometroInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerPluviometrosYLluviasService(): Promise<Pluviometro[]> {
        try {
            const actualDate = new Date();
            const inicioMes = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);
            const finMes = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 0);
            const formatearFecha = (fecha: Date) => fecha.toISOString().split('T')[0];

            return await this.pluviometroRepository.findAll({
                order: [['nombre', 'ASC']],
                include: [
                    {
                        model: AplicacionLluvia,
                        required: false,
                        include: [
                            {
                                model: Lluvia,
                                required: true,
                                where: {
                                    fecha: {
                                        [Op.between]: [formatearFecha(inicioMes), formatearFecha(finMes)]
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
