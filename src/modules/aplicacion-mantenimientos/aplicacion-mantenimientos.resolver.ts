import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { AplicacionMantenimientosService } from './aplicacion-mantenimientos.service';
import { AplicacionMantenimiento } from './entities/aplicacion-mantenimiento.entity';
import { CreateAplicacionMantenimientoInput } from './dto/create-aplicacion-mantenimiento.input';
import { UpdateAplicacionMantenimientoInput } from './dto/update-aplicacion-mantenimiento.input';

@Resolver(() => AplicacionMantenimiento)
export class AplicacionMantenimientosResolver {
    constructor(private readonly aplicacionMantenimientosService: AplicacionMantenimientosService) {}

    @Mutation(() => AplicacionMantenimiento, { name: 'agregarAplicacionMantenimiento' })
    async agregarAplicacionMantenimiento(
        @Args('createAplicacionMantenimientoInput') createAplicacionMantenimientoInput: CreateAplicacionMantenimientoInput
    ): Promise<AplicacionMantenimiento> {
        return this.aplicacionMantenimientosService.agregarAplicacionMantenimientoService(createAplicacionMantenimientoInput);
    }

    @Mutation(() => AplicacionMantenimiento, { name: 'actualizarAplicacionMantenimiento' })
    async actualizarAplicacionMantenimiento(
        @Args('updateAplicacionMantenimientoInput') updateAplicacionMantenimientoInput: UpdateAplicacionMantenimientoInput
    ): Promise<AplicacionMantenimiento> {
        return this.aplicacionMantenimientosService.actualizarAplicacionMantenimientoService(
            updateAplicacionMantenimientoInput.idApMant,
            updateAplicacionMantenimientoInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarAplicacionMantenimiento' })
    async eliminarAplicacionMantenimiento(@Args('idApMant', { type: () => Int }) idApMant: number): Promise<boolean> {
        return this.aplicacionMantenimientosService.eliminarAplicacionMantenimientoService(idApMant);
    }

    @Query(() => [AplicacionMantenimiento], { name: 'obtenerAplicacionesMantenimiento' })
    async obtenerAplicacionesMantenimiento(
        @Args('maquinariaId', { type: () => Int }) maquinariaId: number
    ): Promise<AplicacionMantenimiento[]> {
        return this.aplicacionMantenimientosService.obtenerAplicacionesMantenimientoService(maquinariaId);
    }
}
