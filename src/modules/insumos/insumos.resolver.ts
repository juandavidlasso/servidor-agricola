import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InsumosService } from './insumos.service';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoInput } from './dto/create-insumo.input';
import { UpdateInsumoInput } from './dto/update-insumo.input';

@Resolver(() => Insumo)
export class InsumosResolver {
    constructor(private readonly insumosService: InsumosService) {}

    @Mutation(() => Insumo, { name: 'agregarInsumo' })
    async agregarInsumo(@Args('createInsumoInput') createInsumoInput: CreateInsumoInput): Promise<Insumo> {
        return this.insumosService.agregarInsumoService(createInsumoInput);
    }

    @Query(() => [Insumo], { name: 'obtenerInsumos' })
    async obtenerInsumos(): Promise<Insumo[]> {
        return this.insumosService.obtenerInsumosService();
    }

    @Mutation(() => Insumo, { name: 'actualizarInsumo' })
    async actualizarInsumo(@Args('updateInsumoInput') updateInsumoInput: UpdateInsumoInput): Promise<Insumo> {
        return this.insumosService.actualizarInsumoService(updateInsumoInput.idInsumo, updateInsumoInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarInsumo' })
    async eliminarInsumo(@Args('idInsumo', { type: () => Int }) idInsumo: number): Promise<boolean> {
        return this.insumosService.eliminarInsumoService(idInsumo);
    }
}
