import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AplicacionPlagasService } from './aplicacion-plagas.service';
import { AplicacionPlagas } from './entities/aplicacion-plagas.entity';
import { CreateAplicacionPlagasInput } from './dto/create-aplicacion-plagas.input';
import { UpdateAplicacionPlagasInput } from './dto/update-aplicacion-plagas.input';

@Resolver(() => AplicacionPlagas)
export class AplicacionPlagasResolver {
    constructor(private readonly aplicacionPlagasService: AplicacionPlagasService) {}

    @Mutation(() => AplicacionPlagas, { name: 'agregarAplicacionPlagas' })
    async agregarAplicacionPlagas(
        @Args('createAplicacionPlagasInput') createAplicacionPlagasInput: CreateAplicacionPlagasInput
    ): Promise<AplicacionPlagas> {
        return this.aplicacionPlagasService.agregarAplicacionPlagasService(createAplicacionPlagasInput);
    }

    @Mutation(() => AplicacionPlagas, { name: 'actualizarAplicacionPlagas' })
    async actualizarAplicacionPlagas(
        @Args('updateAplicacionPlagasInput') updateAplicacionPlagasInput: UpdateAplicacionPlagasInput
    ): Promise<AplicacionPlagas> {
        return this.aplicacionPlagasService.actualizarAplicacionPlagasService(
            updateAplicacionPlagasInput.id_apla,
            updateAplicacionPlagasInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarAplicacionPlagas' })
    async eliminarAplicacionPlagas(@Args('id_apla', { type: () => Int }) id_apla: number): Promise<boolean> {
        return this.aplicacionPlagasService.eliminarAplicacionPlagasService(id_apla);
    }
}
