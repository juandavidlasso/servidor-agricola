import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { AplicacionLluviasService } from './aplicacion_lluvias.service';
import { AplicacionLluvia } from './entities/aplicacion_lluvia.entity';
import { CreateAplicacionLluviaInput } from './dto/create-aplicacion_lluvia.input';

@Resolver(() => AplicacionLluvia)
export class AplicacionLluviasResolver {
    constructor(private readonly aplicacionLluviasService: AplicacionLluviasService) {}

    @Mutation(() => AplicacionLluvia, { name: 'agregarAplicacionLluvia' })
    async agregarAplicacionLluvia(
        @Args('createAplicacionLluviaInput', { type: () => CreateAplicacionLluviaInput })
        createAplicacionLluviaInput: CreateAplicacionLluviaInput
    ): Promise<AplicacionLluvia> {
        return this.aplicacionLluviasService.agregarAplicacionLluviaService(createAplicacionLluviaInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarAplicacionLluvia' })
    async eliminarAplicacionLluvia(
        @Args('id_aplicacion_lluvia', { type: () => Int }) id_aplicacion_lluvia: number
    ): Promise<boolean> {
        return this.aplicacionLluviasService.eliminarAplicacionLluviaService(id_aplicacion_lluvia);
    }

    @Query(() => [AplicacionLluvia], { name: 'obtenerResumenLluviasYear' })
    async obtenerResumenLluviasYear(@Args('year', { type: () => Int }) year: number): Promise<AplicacionLluvia[]> {
        return this.aplicacionLluviasService.obtenerResumenLluviasYearService(year);
    }

    @Query(() => [AplicacionLluvia], { name: 'obtenerResumenPluviometroYear' })
    async obtenerResumenPluviometroYear(@Args('year', { type: () => Int }) year: number): Promise<AplicacionLluvia[]> {
        return this.aplicacionLluviasService.obtenerResumenPluviometroYearService(year);
    }
}
