import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AplicacionHerbicidasService } from './aplicacion-herbicidas.service';
import { CreateAplicacionHerbicidaInput } from './dto/create-aplicacion-herbicida.input';
import { UpdateAplicacionHerbicidaInput } from './dto/update-aplicacion-herbicida.input';
import { AplicacionHerbicida } from './entities/aplicacion-herbicida.entity';

@Resolver(() => AplicacionHerbicida)
export class AplicacionHerbicidasResolver {
    constructor(private readonly aplicacionHerbicidasService: AplicacionHerbicidasService) {}

    @Mutation(() => AplicacionHerbicida, { name: 'agregarAplicacionHerbicida' })
    async agregarAplicacionHerbicida(
        @Args('createAplicacionHerbicidaInput') createAplicacionHerbicidaInput: CreateAplicacionHerbicidaInput
    ): Promise<AplicacionHerbicida> {
        return this.aplicacionHerbicidasService.agregarAplicacionHerbicidaService(createAplicacionHerbicidaInput);
    }

    @Query(() => [AplicacionHerbicida], { name: 'obtenerAplicacionesHerbicidas' })
    async obtenerAplicacionesHerbicidas(): Promise<AplicacionHerbicida[]> {
        return this.aplicacionHerbicidasService.obtenerAplicacionesHerbicidasService();
    }

    @Mutation(() => AplicacionHerbicida, { name: 'actualizarAplicacionHerbicida' })
    async actualizarAplicacionHerbicida(
        @Args('updateAplicacionHerbicidaInput') updateAplicacionHerbicidaInput: UpdateAplicacionHerbicidaInput
    ): Promise<AplicacionHerbicida> {
        return this.aplicacionHerbicidasService.actualizarAplicacionHerbicida(
            updateAplicacionHerbicidaInput.id_aphe,
            updateAplicacionHerbicidaInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarAplicacionHerbicida' })
    async eliminarAplicacionHerbicida(@Args('id_aphe') id_aphe: number): Promise<boolean> {
        return this.aplicacionHerbicidasService.eliminarAplicacionHerbicidaService(id_aphe);
    }
}
