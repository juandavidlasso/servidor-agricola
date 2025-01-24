import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAplicacionMantenimientoInput } from './dto/create-aplicacion-mantenimiento.input';
import { UpdateAplicacionMantenimientoInput } from './dto/update-aplicacion-mantenimiento.input';
import { AplicacionMantenimiento } from './entities/aplicacion-mantenimiento.entity';
import { Mantenimiento } from '../mantenimientos/entities/mantenimiento.entity';

@Injectable()
export class AplicacionMantenimientosService {
    constructor(
        @InjectModel(AplicacionMantenimiento)
        private readonly aplicacionMantenimientoRepository: typeof AplicacionMantenimiento
    ) {}

    async agregarAplicacionMantenimientoService(
        createAplicacionMantenimientoInput: CreateAplicacionMantenimientoInput
    ): Promise<AplicacionMantenimiento> {
        try {
            return await this.aplicacionMantenimientoRepository.create(createAplicacionMantenimientoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarAplicacionMantenimientoService(
        idApMant: number,
        updateAplicacionMantenimientoInput: UpdateAplicacionMantenimientoInput
    ): Promise<AplicacionMantenimiento> {
        try {
            const aplicacionMantenimiento = await this.aplicacionMantenimientoRepository.findOne({ where: { idApMant } });

            if (!aplicacionMantenimiento) throw new Error('La aplicacion del mantenimiento no esta registrada');

            return await aplicacionMantenimiento.update(updateAplicacionMantenimientoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarAplicacionMantenimientoService(idApMant: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.aplicacionMantenimientoRepository.destroy({ where: { idApMant } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerAplicacionesMantenimientoService(maquinariaId: number): Promise<AplicacionMantenimiento[]> {
        try {
            return await this.aplicacionMantenimientoRepository.findAll({
                where: {
                    maquinariaId
                },
                include: [
                    {
                        model: Mantenimiento,
                        required: false
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
