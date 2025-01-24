import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CortesService } from './cortes.service';
import { Corte } from './entities/corte.entity';
import { CreateCorteInput } from './dto/create-corte.input';
import { UpdateCorteInput } from './dto/update-corte.input';

@Resolver(() => Corte)
export class CortesResolver {
    constructor(private readonly cortesService: CortesService) {}

    @Mutation(() => Corte, { name: 'agregarCorte' })
    async agregarCorte(@Args('createCorteInput') createCorteInput: CreateCorteInput): Promise<Corte> {
        return await this.cortesService.agregarCorteService(createCorteInput);
    }

    @Query(() => [Corte], { name: 'obtenerCortesRenovados' })
    async obtenerCortesRenovados(@Args('nombre', { type: () => String }) nombre: string): Promise<Corte[]> {
        return await this.cortesService.obtenerCortesRenovadosService(nombre);
    }

    @Query(() => Int, { name: 'obtenerCortesPorSuerte' })
    async obtenerCortesPorSuerte(@Args('id_suerte', { type: () => Int }) id_suerte: number): Promise<number> {
        return await this.cortesService.obtenerCortesPorSuerteService(id_suerte);
    }

    @Query(() => Corte, { name: 'obtenerCorte' })
    async obtenerCorte(@Args('id_corte', { type: () => Int }) id_corte: number): Promise<Corte> {
        return await this.cortesService.obtenerCorteService(id_corte);
    }

    @Mutation(() => Corte, { name: 'actualizarCorte' })
    async actualizarCorte(@Args('updateCorteInput') updateCorteInput: UpdateCorteInput): Promise<Corte> {
        return await this.cortesService.actualizarCorteService(updateCorteInput.id_corte, updateCorteInput);
    }

    @Query(() => Corte, { name: 'obtenerCorteActual' })
    async obtenerCorteActual(@Args('id_suerte', { type: () => Int }) id_suerte: number): Promise<Corte> {
        return await this.cortesService.obtenerCorteActualService(id_suerte);
    }
}
