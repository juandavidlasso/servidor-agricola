import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAplicacionHerbicidaInput } from './dto/create-aplicacion-herbicida.input';
import { UpdateAplicacionHerbicidaInput } from './dto/update-aplicacion-herbicida.input';
import { AplicacionHerbicida } from './entities/aplicacion-herbicida.entity';
import { TratamientoHerbicida } from '../tratamiento-herbicidas/entities/tratamiento-herbicida.entity';

@Injectable()
export class AplicacionHerbicidasService {
    constructor(
        @InjectModel(AplicacionHerbicida)
        private readonly aplicacionHerbicidaRepository: typeof AplicacionHerbicida
    ) {}

    async agregarAplicacionHerbicidaService(
        createAplicacionHerbicidaInput: CreateAplicacionHerbicidaInput
    ): Promise<AplicacionHerbicida> {
        try {
            return await this.aplicacionHerbicidaRepository.create(createAplicacionHerbicidaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerAplicacionesHerbicidasService(): Promise<AplicacionHerbicida[]> {
        try {
            return await this.aplicacionHerbicidaRepository.findAll({
                order: [['fecha', 'DESC']],
                include: [
                    {
                        model: TratamientoHerbicida
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarAplicacionHerbicida(
        id_aphe: number,
        updateAplicacionHerbicidaInput: UpdateAplicacionHerbicidaInput
    ): Promise<AplicacionHerbicida> {
        try {
            const aplicacionHerbicida = await this.aplicacionHerbicidaRepository.findOne({ where: { id_aphe } });

            if (!aplicacionHerbicida) throw new Error('La aplicación no esta registrada.');

            return await aplicacionHerbicida.update(updateAplicacionHerbicidaInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionHerbicidaService(id_aphe: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionHerbicidaRepository.destroy({ where: { id_aphe } }).then((rows) => {
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
