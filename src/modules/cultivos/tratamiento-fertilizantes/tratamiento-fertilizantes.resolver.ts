import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { TratamientoFertilizantesService } from './tratamiento-fertilizantes.service';
import { TratamientoFertilizante } from './entities/tratamiento-fertilizante.entity';
import { CreateTratamientoFertilizanteInput } from './dto/create-tratamiento-fertilizante.input';
import { UpdateTratamientoFertilizanteInput } from './dto/update-tratamiento-fertilizante.input';

@Resolver(() => TratamientoFertilizante)
export class TratamientoFertilizantesResolver {
    constructor(private readonly tratamientoFertilizantesService: TratamientoFertilizantesService) {}

    @Mutation(() => TratamientoFertilizante, { name: 'agregarTratamientoFertilizante' })
    async agregarTratamientoFertilizante(
        @Args('createTratamientoFertilizanteInput') createTratamientoFertilizanteInput: CreateTratamientoFertilizanteInput
    ): Promise<TratamientoFertilizante> {
        return this.tratamientoFertilizantesService.agregarTratamientoFertilizanteService(createTratamientoFertilizanteInput);
    }

    @Mutation(() => TratamientoFertilizante, { name: 'actualizarTratamientoFertilizante' })
    async actualizarTratamientoFertilizante(
        @Args('updateTratamientoFertilizanteInput') updateTratamientoFertilizanteInput: UpdateTratamientoFertilizanteInput
    ): Promise<TratamientoFertilizante> {
        return this.tratamientoFertilizantesService.actualizarTratamientoFertilizanteService(
            updateTratamientoFertilizanteInput.id_trafe,
            updateTratamientoFertilizanteInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarTratamientoFertilizante' })
    async eliminarTratamientoFertilizante(@Args('id_trafe', { type: () => Int }) id_trafe: number): Promise<boolean> {
        return this.tratamientoFertilizantesService.eliminarTratamientoFertilizanteService(id_trafe);
    }
}
