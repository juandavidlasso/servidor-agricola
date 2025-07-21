import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AplicacionFertilizantesService } from './aplicacion-fertilizantes.service';
import { AplicacionFertilizante } from './entities/aplicacion-fertilizante.entity';
import { CreateAplicacionFertilizanteInput } from './dto/create-aplicacion-fertilizante.input';
import { UpdateAplicacionFertilizanteInput } from './dto/update-aplicacion-fertilizante.input';

@Resolver(() => AplicacionFertilizante)
export class AplicacionFertilizantesResolver {
    constructor(private readonly aplicacionFertilizantesService: AplicacionFertilizantesService) {}

    @Mutation(() => AplicacionFertilizante, { name: 'agregarAplicacionFertilizante' })
    async agregarAplicacionFertilizante(
        @Args('createAplicacionFertilizanteInput') createAplicacionFertilizanteInput: CreateAplicacionFertilizanteInput
    ): Promise<AplicacionFertilizante> {
        return this.aplicacionFertilizantesService.agregarAplicacionFertilizanteService(createAplicacionFertilizanteInput);
    }

    @Query(() => [AplicacionFertilizante], { name: 'obtenerAplicacionesFertilizantes' })
    async obtenerAplicacionesFertilizantes(): Promise<AplicacionFertilizante[]> {
        return this.aplicacionFertilizantesService.obtenerAplicacionesFertilizantesService();
    }

    @Mutation(() => AplicacionFertilizante, { name: 'actualizarAplicacionFertilizante' })
    async actualizarAplicacionFertilizante(
        @Args('updateAplicacionFertilizanteInput') updateAplicacionFertilizanteInput: UpdateAplicacionFertilizanteInput
    ): Promise<AplicacionFertilizante> {
        return this.aplicacionFertilizantesService.actualizarAplicacionFertilizanteService(
            updateAplicacionFertilizanteInput.id_apfe,
            updateAplicacionFertilizanteInput
        );
    }

    @Mutation(() => Boolean, { name: 'eliminarAplicacionFertilizante' })
    async eliminarAplicacionFertilizante(
        @Args('id_apfe', { type: () => Int, name: 'id_apfe' }) id_apfe: number
    ): Promise<boolean> {
        return this.aplicacionFertilizantesService.eliminarAplicacionFertilizanteService(id_apfe);
    }
}
