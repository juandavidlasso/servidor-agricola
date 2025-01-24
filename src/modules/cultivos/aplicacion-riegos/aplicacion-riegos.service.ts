import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateAplicacionRiegoInput } from './dto/create-aplicacion-riego.input';
import { AplicacionRiego } from './entities/aplicacion-riego.entity';

@Injectable()
export class AplicacionRiegosService {
    constructor(
        @InjectModel(AplicacionRiego)
        private readonly aplicacionRiegoRepository: typeof AplicacionRiego
    ) {}

    async agregarAplicacionRiegoService(createAplicacionRiegoInput: CreateAplicacionRiegoInput[]): Promise<number[]> {
        try {
            let aplicacionesRegistradas: number[] = [];
            for (let index = 0; index < createAplicacionRiegoInput.length; index++) {
                const registered = await this.aplicacionRiegoRepository.create(createAplicacionRiegoInput[index]);
                if (registered.dataValues) {
                    aplicacionesRegistradas.push(registered.dataValues.id_apriego);
                }
            }
            return aplicacionesRegistradas;
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionRiegoService(ids: number[]): Promise<number[]> {
        try {
            let aplicacionesEliminadas: number[] = [];
            for (let index = 0; index < ids.length; index++) {
                await this.aplicacionRiegoRepository.destroy({ where: { id_apriego: ids[index] } }).then((rows) => {
                    if (rows === 1) {
                        aplicacionesEliminadas.push(rows);
                    }
                });
            }
            return aplicacionesEliminadas;
        } catch (error) {
            throw new Error(error);
        }
    }
}
