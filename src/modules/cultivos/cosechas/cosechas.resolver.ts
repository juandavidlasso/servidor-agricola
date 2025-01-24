import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CosechasService } from './cosechas.service';
import { Cosecha } from './entities/cosecha.entity';
import { CreateCosechaInput } from './dto/create-cosecha.input';
import { UpdateCosechaInput } from './dto/update-cosecha.input';

@Resolver(() => Cosecha)
export class CosechasResolver {
    constructor(private readonly cosechasService: CosechasService) {}

    @Mutation(() => Cosecha, { name: 'agregarCosecha' })
    async agregarCosecha(@Args('createCosechaInput') createCosechaInput: CreateCosechaInput): Promise<Cosecha> {
        return this.cosechasService.agregarCosechaService(createCosechaInput);
    }

    @Query(() => Cosecha, { name: 'obtenerCosechaCorte' })
    async obtenerCosechaCorte(@Args('id_corte', { type: () => Int }) id_corte: number): Promise<Cosecha> {
        return this.cosechasService.obtenerCosechaCorteService(id_corte);
    }

    @Mutation(() => Cosecha, { name: 'actualizarCosecha' })
    async actualizarCosecha(@Args('updateCosechaInput') updateCosechaInput: UpdateCosechaInput) {
        return this.cosechasService.actualizarCosechaService(updateCosechaInput.id_cosecha, updateCosechaInput);
    }
}
