import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuertesService } from './suertes.service';
import { Suerte } from './entities/suerte.entity';
import { CreateSuerteInput, ProntuarioInput } from './dto/create-suerte.input';
import { UpdateSuerteInput } from './dto/update-suerte.input';
import { Cosecha } from '../cosechas/entities/cosecha.entity';

@Resolver(() => Suerte)
export class SuertesResolver {
    constructor(private readonly suertesService: SuertesService) {}

    @Mutation(() => Suerte, { name: 'agregarSuerte' })
    async agregarSuerte(@Args('createSuerteInput') createSuerteInput: CreateSuerteInput): Promise<Suerte> {
        return await this.suertesService.agregarSuerteService(createSuerteInput);
    }

    @Mutation(() => Suerte, { name: 'agregarSuerteRenovada' })
    async agregarSuerteRenovada(@Args('createSuerteInput') createSuerteInput: CreateSuerteInput): Promise<Suerte> {
        return await this.suertesService.agregarSuerteRenovadaService(createSuerteInput);
    }

    @Query(() => [Suerte], { name: 'obtenerSuertesRenovadas' })
    async obtenerSuertesRenovadas(): Promise<Suerte[]> {
        return await this.suertesService.obtenerSuertesRenovadasService();
    }

    @Query(() => Suerte, { name: 'obtenerSuerte' })
    async obtenerSuerte(@Args('id_suerte', { type: () => Int }) id_suerte: number): Promise<Suerte> {
        return await this.suertesService.obtenerSuerteService(id_suerte);
    }

    @Mutation(() => Suerte, { name: 'actualizarSuerte' })
    async actualizarSuerte(@Args('updateSuerteInput') updateSuerteInput: UpdateSuerteInput): Promise<Suerte> {
        return await this.suertesService.actualizarSuerteService(updateSuerteInput.id_suerte, updateSuerteInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarSuerte' })
    async eliminarSuerte(@Args('id_suerte', { type: () => Int }) id_suerte: number): Promise<boolean> {
        return await this.suertesService.eliminarSuerteService(id_suerte);
    }

    @Query(() => Number, { name: 'obtenerAreaSuerte' })
    async obtenerAreaSuerte(@Args('id_suerte', { type: () => Int }) id_suerte: number): Promise<number> {
        return await this.suertesService.obtenerAreaSuerteService(id_suerte);
    }

    @Query(() => [Suerte], { name: 'obtenerSuertesRenovadasYCortes' })
    async obtenerSuertesRenovadasYCortes(): Promise<Suerte[]> {
        return await this.suertesService.obtenerSuertesRenovadasYCortesService();
    }

    @Query(() => [Suerte], { name: 'obtenerSuertesRenovadasCortesTablones' })
    async obtenerSuertesRenovadasCortesTablones(): Promise<Suerte[]> {
        return await this.suertesService.obtenerSuertesRenovadasCortesTablonesService();
    }

    @Query(() => [Cosecha], { name: 'consultarProntuario' })
    async consultarProntuario(@Args('prontuarioInput') prontuarioInput: ProntuarioInput): Promise<Cosecha[]> {
        return await this.suertesService.consultarProntuarioService(prontuarioInput);
    }

    @Query(() => [Suerte], { name: 'obtenerDatosActuales' })
    async obtenerDatosActuales(@Args('nombres', { type: () => String }) nombres: string): Promise<Suerte[]> {
        return await this.suertesService.obtenerDatosActualesService(nombres);
    }
}
