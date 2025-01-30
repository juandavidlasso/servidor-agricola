import { Injectable } from '@nestjs/common';
import { CreateAplicacionFertilizanteInput } from './dto/create-aplicacion-fertilizante.input';
import { UpdateAplicacionFertilizanteInput } from './dto/update-aplicacion-fertilizante.input';
import { InjectModel } from '@nestjs/sequelize';
import { AplicacionFertilizante } from './entities/aplicacion-fertilizante.entity';
import { TratamientoFertilizante } from '../tratamiento-fertilizantes/entities/tratamiento-fertilizante.entity';

@Injectable()
export class AplicacionFertilizantesService {
    constructor(
        @InjectModel(AplicacionFertilizante)
        private readonly aplicacionFertilizanteRepository: typeof AplicacionFertilizante,
        @InjectModel(TratamientoFertilizante)
        private readonly tratamientosFertilizantes: typeof TratamientoFertilizante
    ) {}

    async agregarAplicacionFertilizanteService(
        createAplicacionFertilizanteInput: CreateAplicacionFertilizanteInput
    ): Promise<AplicacionFertilizante> {
        try {
            return await this.aplicacionFertilizanteRepository.create(createAplicacionFertilizanteInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerAplicacionesFertilizantesService(): Promise<AplicacionFertilizante[]> {
        try {
            return await this.aplicacionFertilizanteRepository.findAll({
                order: [['fecha', 'DESC']],
                include: [
                    {
                        model: TratamientoFertilizante
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarAplicacionFertilizanteService(
        id_apfe: number,
        updateAplicacionFertilizanteInput: UpdateAplicacionFertilizanteInput
    ): Promise<AplicacionFertilizante> {
        try {
            const aplicacionHerbicida = await this.aplicacionFertilizanteRepository.findOne({ where: { id_apfe } });

            if (!aplicacionHerbicida) throw new Error('La aplicación no esta registrada.');

            if (updateAplicacionFertilizanteInput.duplicate) {
                const newApplication = await this.aplicacionFertilizanteRepository.create({
                    fecha: updateAplicacionFertilizanteInput.fecha,
                    tipo: updateAplicacionFertilizanteInput.tipo
                });

                const tratamientos = await this.tratamientosFertilizantes.findAll({
                    where: {
                        apfe_id: updateAplicacionFertilizanteInput.id_apfe
                    }
                });
                if (tratamientos.length > 0) {
                    for (let index = 0; index < tratamientos.length; index++) {
                        await this.tratamientosFertilizantes.create({
                            producto: tratamientos[index].producto,
                            dosis: tratamientos[index].dosis,
                            presentacion: tratamientos[index].presentacion,
                            valor: tratamientos[index].valor,
                            aplico: tratamientos[index].aplico,
                            nota: tratamientos[index].nota,
                            apfe_id: newApplication.dataValues.id_apfe
                        });
                    }
                }
                return newApplication;
            }

            return await aplicacionHerbicida.update(updateAplicacionFertilizanteInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionFertilizanteService(id_apfe: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionFertilizanteRepository.destroy({ where: { id_apfe } }).then((rows) => {
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
