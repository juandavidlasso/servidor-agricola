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
        private readonly aplicacionHerbicidaRepository: typeof AplicacionHerbicida,
        @InjectModel(TratamientoHerbicida)
        private readonly tratamientosHerbicidas: typeof TratamientoHerbicida
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
                attributes: ['id_aphe', 'fecha', 'tipo'],
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
            const aplicacionHerbicida = await this.aplicacionHerbicidaRepository.findOne({
                where: { id_aphe },
                attributes: ['id_aphe', 'fecha', 'tipo']
            });

            if (!aplicacionHerbicida) throw new Error('La aplicación no esta registrada.');

            if (updateAplicacionHerbicidaInput.duplicate) {
                const newApplication = await this.aplicacionHerbicidaRepository.create({
                    fecha: updateAplicacionHerbicidaInput.fecha,
                    tipo: updateAplicacionHerbicidaInput.tipo
                });

                const tratamientos = await this.tratamientosHerbicidas.findAll({
                    where: {
                        aphe_id: updateAplicacionHerbicidaInput.id_aphe
                    }
                });
                if (tratamientos.length > 0) {
                    for (let index = 0; index < tratamientos.length; index++) {
                        await this.tratamientosHerbicidas.create({
                            producto: tratamientos[index].producto,
                            dosis: tratamientos[index].dosis,
                            presentacion: tratamientos[index].presentacion,
                            valor: tratamientos[index].valor,
                            aplico: tratamientos[index].aplico,
                            nota: tratamientos[index].nota,
                            aphe_id: newApplication.dataValues.id_aphe
                        });
                    }
                }
                return newApplication;
            }

            return await aplicacionHerbicida.update(updateAplicacionHerbicidaInput);
        } catch (error) {
            throw new Error(error);
        }
    }
}
