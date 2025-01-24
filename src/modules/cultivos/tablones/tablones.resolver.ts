import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TablonesService } from './tablones.service';
import { Tablon } from './entities/tablon.entity';
import { CreateTabloneInput } from './dto/create-tablon.input';
import { UpdateTablonInput } from './dto/update-tablon.input';

@Resolver(() => Tablon)
export class TablonesResolver {
    constructor(private readonly tablonesService: TablonesService) {}

    @Mutation(() => [Number], { name: 'agregarTablon' })
    async agregarTablon(
        @Args('createTabloneInput', { type: () => [CreateTabloneInput] }) createTabloneInput: CreateTabloneInput[]
    ): Promise<number[]> {
        return await this.tablonesService.agregarTablonService(createTabloneInput);
    }

    @Query(() => [Tablon], { name: 'obtenerTablonesPorCorte' })
    async obtenerTablonesPorCorte(@Args('id_corte', { type: () => Int }) id_corte: number): Promise<Tablon[]> {
        return await this.tablonesService.obtenerTablonesPorCorteService(id_corte);
    }

    @Mutation(() => Tablon, { name: 'actualizarTablon' })
    async actualizarTablon(@Args('updateTabloneInput') updateTabloneInput: UpdateTablonInput): Promise<Tablon> {
        return await this.tablonesService.actualizarTablonService(updateTabloneInput.id_tablon, updateTabloneInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarTablon' })
    async eliminarTablon(@Args('id_tablon', { type: () => Int }) id_tablon: number): Promise<boolean> {
        return await this.tablonesService.eliminarTablonService(id_tablon);
    }

    @Query(() => Number, { name: 'countTablonesPorSuerte' })
    async countTablonesPorSuerte(@Args('id_suerte', { type: () => Int }) id_suerte: number): Promise<number> {
        return await this.tablonesService.countTablonesPorSuerteService(id_suerte);
    }

    @Query(() => [Tablon], { name: 'obtenerTablonesYAplicacionesPlagas' })
    async obtenerTablonesYAplicacionesPlagas(@Args('id_corte', { type: () => Int }) id_corte: number): Promise<Tablon[]> {
        return await this.tablonesService.obtenerTablonesYAplicacionesPlagasService(id_corte);
    }

    @Query(() => Tablon, { name: 'obtenerTotalHectareasSuertes' })
    async obtenerTotalHectareasSuertes(): Promise<Tablon> {
        return await this.tablonesService.obtenerTotalHectareasSuertesService();
    }
}
