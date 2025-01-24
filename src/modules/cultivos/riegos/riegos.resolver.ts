import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RiegosService } from './riegos.service';
import { Riego } from './entities/riego.entity';
import { CreateRiegoInput } from './dto/create-riego.input';
import { UpdateRiegoInput } from './dto/update-riego.input';

@Resolver(() => Riego)
export class RiegosResolver {
    constructor(private readonly riegosService: RiegosService) {}

    @Mutation(() => Riego, { name: 'agregarRiego' })
    async agregarRiego(@Args('createRiegoInput') createRiegoInput: CreateRiegoInput): Promise<Riego> {
        return this.riegosService.agregarRiegoService(createRiegoInput);
    }

    @Query(() => [Riego], { name: 'obtenerRiegosCorte' })
    async obtenerRiegosCorte(@Args('corte_id', { type: () => Int }) corte_id: number): Promise<Riego[]> {
        return this.riegosService.obtenerRiegosCorteService(corte_id);
    }

    @Query(() => Number, { name: 'obtenerRiegosMayor' })
    async obtenerRiegosMayor(@Args('corte_id', { type: () => Int }) corte_id: number): Promise<number> {
        return this.riegosService.obtenerRiegosMayorService(corte_id);
    }

    @Mutation(() => Riego, { name: 'actualizarRiego' })
    async actualizarRiego(@Args('updateRiegoInput') updateRiegoInput: UpdateRiegoInput): Promise<Riego> {
        return this.riegosService.actualizarRiegoService(updateRiegoInput.id_riego, updateRiegoInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarRiego' })
    async eliminarRiego(@Args('id_riego', { type: () => Int }) id_riego: number): Promise<boolean> {
        return this.riegosService.eliminarRiegoService(id_riego);
    }
}
