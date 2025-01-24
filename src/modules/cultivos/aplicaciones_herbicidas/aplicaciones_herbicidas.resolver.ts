import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AplicacionesHerbicidasService } from './aplicaciones_herbicidas.service';
import { AplicacionesHerbicida } from './entities/aplicaciones_herbicida.entity';
import { CreateAplicacionesHerbicidaInput } from './dto/create-aplicaciones_herbicida.input';

@Resolver(() => AplicacionesHerbicida)
export class AplicacionesHerbicidasResolver {
    constructor(private readonly aplicacionesHerbicidasService: AplicacionesHerbicidasService) {}

    @Mutation(() => [Number], { name: 'agregarAplicacionesHerbicidas' })
    async agregarAplicacionesHerbicidas(
        @Args('createAplicacionesHerbicidaInput', { type: () => [CreateAplicacionesHerbicidaInput] })
        createAplicacionesHerbicidaInput: CreateAplicacionesHerbicidaInput[]
    ): Promise<number[]> {
        return this.aplicacionesHerbicidasService.agregarAplicacionesHerbicidasService(createAplicacionesHerbicidaInput);
    }

    @Query(() => [AplicacionesHerbicida], { name: 'obtenerAplicacionesHerbicidasCorte' })
    async obtenerAplicacionesHerbicidasCorte(
        @Args('corte_id', { type: () => Int }) corte_id: number
    ): Promise<AplicacionesHerbicida[]> {
        return this.aplicacionesHerbicidasService.obtenerAplicacionesHerbicidasCorteService(corte_id);
    }

    @Mutation(() => Boolean)
    async eliminarAplicacionesHerbicidasService(
        @Args('id_aplicaciones_herbicidas', { type: () => Int }) id_aplicaciones_herbicidas: number
    ): Promise<boolean> {
        return this.aplicacionesHerbicidasService.eliminarAplicacionesHerbicidasService(id_aplicaciones_herbicidas);
    }
}
