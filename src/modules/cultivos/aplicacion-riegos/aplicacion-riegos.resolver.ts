import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AplicacionRiegosService } from './aplicacion-riegos.service';
import { AplicacionRiego } from './entities/aplicacion-riego.entity';
import { CreateAplicacionRiegoInput } from './dto/create-aplicacion-riego.input';

@Resolver(() => AplicacionRiego)
export class AplicacionRiegosResolver {
    constructor(private readonly aplicacionRiegosService: AplicacionRiegosService) {}

    @Mutation(() => [Number], { name: 'agregarAplicacionRiego' })
    async agregarAplicacionRiego(
        @Args('createAplicacionRiegoInput', { type: () => [CreateAplicacionRiegoInput] })
        createAplicacionRiegoInput: CreateAplicacionRiegoInput[]
    ): Promise<number[]> {
        return this.aplicacionRiegosService.agregarAplicacionRiegoService(createAplicacionRiegoInput);
    }

    @Mutation(() => [Number], { name: 'eliminarAplicacionRiego' })
    async eliminarAplicacionRiego(@Args('ids', { type: () => [Int] }) ids: [number]): Promise<number[]> {
        return this.aplicacionRiegosService.eliminarAplicacionRiegoService(ids);
    }
}
