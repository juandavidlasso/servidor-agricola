import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TratamientoPlagasService } from './tratamiento-plagas.service';
import { TratamientoPlagas } from './entities/tratamiento-plagas.entity';
import { CreateTratamientoPlagasInput } from './dto/create-tratamiento-plagas.input';
import { UpdateTratamientoPlagasInput } from './dto/update-tratamiento-plagas.input';

@Resolver(() => TratamientoPlagas)
export class TratamientoPlagasResolver {
    constructor(private readonly tratamientoPlagasService: TratamientoPlagasService) {}

    @Mutation(() => TratamientoPlagas, { name: 'agregarTratamientoPlagas' })
    async agregarTratamientoPlagas(
        @Args('createTratamientoPlagasInput') createTratamientoPlagasInput: CreateTratamientoPlagasInput
    ): Promise<TratamientoPlagas> {
        return this.tratamientoPlagasService.agregarTratamientoPlagasService(createTratamientoPlagasInput);
    }

    @Query(() => [TratamientoPlagas], { name: 'obtenerTratamientoPlagas' })
    async obtenerTratamientoPlagas(): Promise<TratamientoPlagas[]> {
        return this.tratamientoPlagasService.obtenerTratamientoPlagasService();
    }

    @Mutation(() => TratamientoPlagas, { name: 'actualizarTratamientoPlagas' })
    async actualizarTratamientoPlagas(
        @Args('updateTratamientoPlagasInput') updateTratamientoPlagasInput: UpdateTratamientoPlagasInput
    ): Promise<TratamientoPlagas> {
        return this.tratamientoPlagasService.actualizarTratamientoPlagasService(
            updateTratamientoPlagasInput.id_trapl,
            updateTratamientoPlagasInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarTratamientoPlagas' })
    async eliminarTratamientoPlagas(@Args('id_trapl', { type: () => Int }) id_trapl: number): Promise<boolean> {
        return this.tratamientoPlagasService.eliminarTratamientoPlagasService(id_trapl);
    }
}
