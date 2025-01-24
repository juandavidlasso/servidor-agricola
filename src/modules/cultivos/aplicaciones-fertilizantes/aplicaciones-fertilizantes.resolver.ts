import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AplicacionesFertilizantesService } from './aplicaciones-fertilizantes.service';
import { AplicacionesFertilizante } from './entities/aplicaciones-fertilizante.entity';
import { CreateAplicacionesFertilizanteInput } from './dto/create-aplicaciones-fertilizante.input';

@Resolver(() => AplicacionesFertilizante)
export class AplicacionesFertilizantesResolver {
    constructor(private readonly aplicacionesFertilizantesService: AplicacionesFertilizantesService) {}

    @Mutation(() => [Number], { name: 'agregarAplicacionesFertilizantes' })
    async agregarAplicacionesFertilizantes(
        @Args('createAplicacionesFertilizanteInput', { type: () => [CreateAplicacionesFertilizanteInput] })
        createAplicacionesFertilizanteInput: CreateAplicacionesFertilizanteInput[]
    ): Promise<number[]> {
        return this.aplicacionesFertilizantesService.agregarAplicacionesFertilizantesService(createAplicacionesFertilizanteInput);
    }

    @Query(() => [AplicacionesFertilizante], { name: 'obtenerAplicacionesFertilizantesCorte' })
    async obtenerAplicacionesFertilizantesCorte(
        @Args('corte_id', { type: () => Int }) corte_id: number
    ): Promise<AplicacionesFertilizante[]> {
        return this.aplicacionesFertilizantesService.obtenerAplicacionesFertilizantesCorteService(corte_id);
    }

    @Mutation(() => Boolean, { name: 'eliminarAplicacionesFertilizantes' })
    async eliminarAplicacionesFertilizantes(
        @Args('id_aplicaciones_fertilizantes', { type: () => Int }) id_aplicaciones_fertilizantes: number
    ): Promise<boolean> {
        return this.aplicacionesFertilizantesService.eliminarAplicacionesFertilizantesService(id_aplicaciones_fertilizantes);
    }
}
