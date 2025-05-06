import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAplicacionHerbicidaInput } from './dto/create-aplicacion-herbicida.input';
import { UpdateAplicacionHerbicidaInput } from './dto/update-aplicacion-herbicida.input';
import { AplicacionHerbicida } from './entities/aplicacion-herbicida.entity';
import { TratamientoHerbicida } from '../tratamiento-herbicidas/entities/tratamiento-herbicida.entity';
import { AplicacionesHerbicida } from '../aplicaciones_herbicidas/entities/aplicaciones_herbicida.entity';

@Injectable()
export class AplicacionHerbicidasService {
    constructor(
        @InjectModel(AplicacionHerbicida)
        private readonly aplicacionHerbicidaRepository: typeof AplicacionHerbicida,
        @InjectModel(TratamientoHerbicida)
        private readonly tratamientosHerbicidas: typeof TratamientoHerbicida,
        @InjectModel(AplicacionesHerbicida)
        private readonly aplicacionesHerbicidaRepository: typeof AplicacionesHerbicida
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
                attributes: [
                    'id_aphe',
                    'fecha',
                    'tipo',
                    [
                        this.aplicacionHerbicidaRepository.sequelize.literal(
                            '(SELECT GROUP_CONCAT(IFNULL(s.nombre, "") SEPARATOR "-") FROM suertes s INNER JOIN cortes c ON s.id_suerte = c.suerte_id INNER JOIN aplicaciones_herbicidas ahs ON c.id_corte = ahs.corte_id WHERE ahs.aphe_id = AplicacionHerbicida.id_aphe)'
                        ),
                        'suertes'
                    ]
                ],
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

    async eliminarAplicacionHerbicidaService(id_aphe: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            await this.aplicacionesHerbicidaRepository.destroy({ where: { aphe_id: id_aphe } });
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
