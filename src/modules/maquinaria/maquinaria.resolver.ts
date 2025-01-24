import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MaquinariaService } from './maquinaria.service';
import { Maquinaria } from './entities/maquinaria.entity';
import { CreateMaquinariaInput } from './dto/create-maquinaria.input';
import { UpdateMaquinariaInput } from './dto/update-maquinaria.input';

@Resolver(() => Maquinaria)
export class MaquinariaResolver {
    constructor(private readonly maquinariaService: MaquinariaService) {}

    @Mutation(() => Maquinaria, { name: 'agregarMaquinaria' })
    async agregarMaquinaria(@Args('createMaquinariaInput') createMaquinariaInput: CreateMaquinariaInput): Promise<Maquinaria> {
        return this.maquinariaService.agregarMaquinariaService(createMaquinariaInput);
    }

    @Query(() => [Maquinaria], { name: 'obtenerMaquinarias' })
    async obtenerMaquinarias(): Promise<Maquinaria[]> {
        return this.maquinariaService.obtenerMaquinariasService();
    }

    @Mutation(() => Maquinaria, { name: 'actualizarMaquinaria' })
    async actualizarMaquinaria(@Args('updateMaquinariaInput') updateMaquinariaInput: UpdateMaquinariaInput): Promise<Maquinaria> {
        return this.maquinariaService.actualizarMaquinariaService(updateMaquinariaInput.idMaquinaria, updateMaquinariaInput);
    }
}
