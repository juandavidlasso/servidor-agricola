import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateRiegoInput } from './dto/create-riego.input';
import { UpdateRiegoInput } from './dto/update-riego.input';
import { Riego } from './entities/riego.entity';
import { AplicacionRiego } from '../aplicacion-riegos/entities/aplicacion-riego.entity';

@Injectable()
export class RiegosService {
    constructor(
        @InjectModel(Riego)
        private readonly riegoRepository: typeof Riego
    ) {}

    async agregarRiegoService(createRiegoInput: CreateRiegoInput): Promise<Riego> {
        try {
            return await this.riegoRepository.create(createRiegoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerRiegosCorteService(corte_id: number): Promise<Riego[]> {
        try {
            return await this.riegoRepository.findAll({
                order: [['fecha', 'DESC']],
                where: { corte_id },
                include: [
                    {
                        model: AplicacionRiego,
                        required: false
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarRiegoService(id_riego: number, updateRiegoInput: UpdateRiegoInput): Promise<Riego> {
        try {
            const riego = await this.riegoRepository.findOne({ where: { id_riego } });

            if (!riego) throw new Error('El riego no esta registrado.');

            return await riego.update(updateRiegoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarRiegoService(id_riego: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.riegoRepository.destroy({ where: { id_riego } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerRiegosMayorService(corte_id: number): Promise<number> {
        try {
            const numRiegos = await this.riegoRepository.max('num_riego', {
                where: { corte_id }
            });
            if (!numRiegos) return 0;
            return numRiegos as number;
        } catch (error) {
            throw new Error(error);
        }
    }
}
