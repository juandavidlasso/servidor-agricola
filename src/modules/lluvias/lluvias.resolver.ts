import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { LluviasService } from './lluvias.service';
import { Lluvia } from './entities/lluvia.entity';
import { CreateLluviaInput, FilterLluviaInput, FilterLluviaMesYearInput } from './dto/create-lluvia.input';
import { UpdateLluviaInput } from './dto/update-lluvia.input';
import { Pluviometro } from '../pluviometros/entities/pluviometro.entity';

@Resolver(() => Lluvia)
export class LluviasResolver {
    constructor(private readonly lluviasService: LluviasService) {}

    @Mutation(() => [Number], { name: 'agregarLluvia' })
    async agregarLluvia(
        @Args('createLluviaInput', { type: () => [CreateLluviaInput] }) createLluviaInput: CreateLluviaInput[]
    ): Promise<number[]> {
        return this.lluviasService.agregarLluviaService(createLluviaInput);
    }

    @Mutation(() => Lluvia)
    async actualizarLluvia(@Args('updateLluviaInput') updateLluviaInput: UpdateLluviaInput): Promise<Lluvia> {
        return this.lluviasService.actualizarLluviaService(updateLluviaInput.id_lluvia, updateLluviaInput);
    }

    @Mutation(() => Boolean)
    async eliminarLluvia(@Args('id_lluvia', { type: () => Int }) id_lluvia: number): Promise<boolean> {
        return this.lluviasService.eliminarLluviaService(id_lluvia);
    }

    @Query(() => [Lluvia], { name: 'obtenerLluvias' })
    async obtenerLluvias(): Promise<Lluvia[]> {
        return this.lluviasService.obtenerLluviasService();
    }

    @Query(() => [Lluvia], { name: 'obtenerLluviasPorPluviometro' })
    async obtenerLluviasPorPluviometro(@Args('filterLluviaInput') filterLluviaInput: FilterLluviaInput): Promise<Lluvia[]> {
        return this.lluviasService.obtenerLluviasPorPluviometroService(filterLluviaInput);
    }

    @Query(() => [Pluviometro], { name: 'obtenerLluviasMesActual' })
    async obtenerLluviasMesActual(): Promise<Pluviometro[]> {
        return this.lluviasService.obtenerLluviasMesActualService();
    }

    @Query(() => [Pluviometro], { name: 'obtenerLluviasMesYear' })
    async obtenerLluviasMesYear(
        @Args('filterLluviaMesYearInput') filterLluviaMesYearInput: FilterLluviaMesYearInput
    ): Promise<Pluviometro[]> {
        return this.lluviasService.obtenerLluviasMesYearService(filterLluviaMesYearInput);
    }

    @Query(() => [Pluviometro], { name: 'obtenerLluviasYear' })
    async obtenerLluviasYear(
        @Args('filterLluviaMesYearInput') filterLluviaMesYearInput: FilterLluviaMesYearInput
    ): Promise<Pluviometro[]> {
        return this.lluviasService.obtenerLluviasMesYearService(filterLluviaMesYearInput);
    }

    @Query(() => [Lluvia], { name: 'obtenerPromedioLluvias' })
    async obtenerPromedioLluvias(@Args('year', { type: () => Int }) year: number): Promise<Lluvia[]> {
        return this.lluviasService.obtenerPromedioLluviasService(year);
    }
}
