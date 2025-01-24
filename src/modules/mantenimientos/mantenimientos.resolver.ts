import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { MantenimientosService } from './mantenimientos.service';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { CreateMantenimientoInput } from './dto/create-mantenimiento.input';
import { UpdateMantenimientoInput } from './dto/update-mantenimiento.input';

@Resolver(() => Mantenimiento)
export class MantenimientosResolver {
    constructor(private readonly mantenimientosService: MantenimientosService) {}

    @Mutation(() => [Number], { name: 'agregarMantenimiento' })
    async agregarMantenimiento(
        @Args('createMantenimientoInput', { type: () => [CreateMantenimientoInput] })
        createMantenimientoInput: CreateMantenimientoInput[]
    ): Promise<number[]> {
        return this.mantenimientosService.agregarMantenimientoService(createMantenimientoInput);
    }

    @Mutation(() => Mantenimiento, { name: 'actualizarMantenimiento' })
    async actualizarMantenimiento(
        @Args('updateMantenimientoInput') updateMantenimientoInput: UpdateMantenimientoInput
    ): Promise<Mantenimiento> {
        return this.mantenimientosService.actualizarMantenimientoService(
            updateMantenimientoInput.idMantenimiento,
            updateMantenimientoInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarMantenimiento' })
    async eliminarMantenimiento(@Args('idMantenimiento', { type: () => Int }) idMantenimiento: number): Promise<boolean> {
        return this.mantenimientosService.eliminarMantenimientoService(idMantenimiento);
    }
}
