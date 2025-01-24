import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateAplicacionPlagasInput } from './dto/create-aplicacion-plagas.input';
import { UpdateAplicacionPlagasInput } from './dto/update-aplicacion-plagas.input';
import { AplicacionPlagas } from './entities/aplicacion-plagas.entity';

@Injectable()
export class AplicacionPlagasService {
    constructor(
        @InjectModel(AplicacionPlagas)
        private readonly aplicacionPlagasRepository: typeof AplicacionPlagas
    ) {}

    async agregarAplicacionPlagasService(createAplicacionPlagasInput: CreateAplicacionPlagasInput): Promise<AplicacionPlagas> {
        try {
            const existsAplicacion = await this.aplicacionPlagasRepository.findOne({
                where: {
                    corte_id: createAplicacionPlagasInput.corte_id,
                    tablon_id: createAplicacionPlagasInput.tablon_id,
                    trapl_id: createAplicacionPlagasInput.trapl_id
                }
            });

            if (existsAplicacion) throw new Error('La aplicación ya esta registrada en este tablón.');

            return await this.aplicacionPlagasRepository.create(createAplicacionPlagasInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarAplicacionPlagasService(
        id_apla: number,
        updateAplicacionPlagasInput: UpdateAplicacionPlagasInput
    ): Promise<AplicacionPlagas> {
        try {
            const aplicacionPlaga = await this.aplicacionPlagasRepository.findOne({ where: { id_apla } });

            if (!aplicacionPlaga) throw new Error('La aplicacion no esta registrada.');

            return await aplicacionPlaga.update(updateAplicacionPlagasInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionPlagasService(id_apla: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionPlagasRepository.destroy({ where: { id_apla } }).then((rows) => {
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
