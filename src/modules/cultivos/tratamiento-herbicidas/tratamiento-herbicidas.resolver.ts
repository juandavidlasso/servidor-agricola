import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { TratamientoHerbicidasService } from './tratamiento-herbicidas.service';
import { TratamientoHerbicida } from './entities/tratamiento-herbicida.entity';
import { CreateTratamientoHerbicidaInput } from './dto/create-tratamiento-herbicida.input';
import { UpdateTratamientoHerbicidaInput } from './dto/update-tratamiento-herbicida.input';

@Resolver(() => TratamientoHerbicida)
export class TratamientoHerbicidasResolver {
    constructor(private readonly tratamientoHerbicidasService: TratamientoHerbicidasService) {}

    @Mutation(() => TratamientoHerbicida, { name: 'agregarTratamientoHerbicida' })
    async agregarTratamientoHerbicida(
        @Args('createTratamientoHerbicidaInput') createTratamientoHerbicidaInput: CreateTratamientoHerbicidaInput
    ): Promise<TratamientoHerbicida> {
        return this.tratamientoHerbicidasService.agregarTratamientoHerbicidaService(createTratamientoHerbicidaInput);
    }

    @Mutation(() => TratamientoHerbicida, { name: 'actualizarTratamientoHerbicida' })
    async actualizarTratamientoHerbicida(
        @Args('updateTratamientoHerbicidaInput') updateTratamientoHerbicidaInput: UpdateTratamientoHerbicidaInput
    ): Promise<TratamientoHerbicida> {
        return this.tratamientoHerbicidasService.actualizarTratamientoHerbicidaService(
            updateTratamientoHerbicidaInput.id_trahe,
            updateTratamientoHerbicidaInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarTratamientoHerbicida' })
    async eliminarTratamientoHerbicida(@Args('id_trahe', { type: () => Int }) id_trahe: number): Promise<boolean> {
        return this.tratamientoHerbicidasService.eliminarTratamientoHerbicidaService(id_trahe);
    }
}
