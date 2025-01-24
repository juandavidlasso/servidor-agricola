import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AplicacionLaboresService } from './aplicacion-labores.service';
import { AplicacionLabores } from './entities/aplicacion-labores.entity';
import { CreateAplicacionLaboresInput } from './dto/create-aplicacion-labores.input';

@Resolver(() => AplicacionLabores)
export class AplicacionLaboresResolver {
    constructor(private readonly aplicacionLaboresService: AplicacionLaboresService) {}

    @Mutation(() => [Number], { name: 'agregarAplicacionLabores' })
    async agregarAplicacionLabores(
        @Args('createAplicacionLaboresInput', { type: () => [CreateAplicacionLaboresInput] })
        createAplicacionLaboresInput: CreateAplicacionLaboresInput[]
    ): Promise<number[]> {
        return this.aplicacionLaboresService.agregarAplicacionLaboresService(createAplicacionLaboresInput);
    }

    @Query(() => [AplicacionLabores], { name: 'obtenerAplicacionesLabores' })
    async obtenerAplicacionesLabores(
        @Args('corte_id', { type: () => Int, name: 'corte_id' }) corte_id: number
    ): Promise<AplicacionLabores[]> {
        return this.aplicacionLaboresService.obtenerAplicacionesLaboresService(corte_id);
    }

    @Mutation(() => Boolean)
    async eliminarAplicacionLabores(
        @Args('id_aplicacion_labores', { type: () => Int, name: 'id_aplicacion_labores' }) id_aplicacion_labores: number
    ): Promise<boolean> {
        return this.aplicacionLaboresService.eliminarAplicacionLaboresService(id_aplicacion_labores);
    }
}
