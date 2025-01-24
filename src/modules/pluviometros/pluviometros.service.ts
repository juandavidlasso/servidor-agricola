import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
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
            return await this.pluviometroRepository.findAll({
                order: [['nombre', 'ASC']],
                include: [
                    {
                        model: AplicacionLluvia,
                        required: false,
                        attributes: { exclude: ['fecha', 'cantidad'] },
                        include: [{ model: Lluvia, required: true }]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
