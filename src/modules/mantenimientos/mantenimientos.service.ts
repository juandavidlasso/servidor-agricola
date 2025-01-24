import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMantenimientoInput } from './dto/create-mantenimiento.input';
import { UpdateMantenimientoInput } from './dto/update-mantenimiento.input';
import { Mantenimiento } from './entities/mantenimiento.entity';

@Injectable()
export class MantenimientosService {
    constructor(
        @InjectModel(Mantenimiento)
        private readonly mantenimientoRepository: typeof Mantenimiento
    ) {}

    async agregarMantenimientoService(createMantenimientoInput: CreateMantenimientoInput[]): Promise<number[]> {
        const mantenimientosRegistrados: number[] = [];
        try {
            for (let index = 0; index < createMantenimientoInput.length; index++) {
                await this.mantenimientoRepository.create(createMantenimientoInput[index]);
                mantenimientosRegistrados.push(index);
            }
            return mantenimientosRegistrados;
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarMantenimientoService(
        idMantenimiento: number,
        updateMantenimientoInput: UpdateMantenimientoInput
    ): Promise<Mantenimiento> {
        try {
            const mantenimiento = await this.mantenimientoRepository.findOne({ where: { idMantenimiento } });

            if (!mantenimiento) throw new Error('La aplicacion del mantenimiento no esta registrada');

            return await mantenimiento.update(updateMantenimientoInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarMantenimientoService(idMantenimiento: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.mantenimientoRepository.destroy({ where: { idMantenimiento } }).then((rows) => {
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
