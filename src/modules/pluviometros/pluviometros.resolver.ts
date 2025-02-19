import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PluviometrosService } from './pluviometros.service';
import { Pluviometro } from './entities/pluviometro.entity';
import { CreatePluviometroInput, FilterLluviasInput } from './dto/create-pluviometro.input';

@Resolver(() => Pluviometro)
export class PluviometrosResolver {
    constructor(private readonly pluviometrosService: PluviometrosService) {}

    @Mutation(() => Pluviometro, { name: 'agregarPluviometro' })
    async agregarPluviometro(
        @Args('createPluviometroInput') createPluviometroInput: CreatePluviometroInput
    ): Promise<Pluviometro> {
        return await this.pluviometrosService.agregarPluviometroService(createPluviometroInput);
    }

    @Query(() => [Pluviometro], { name: 'obtenerPluviometrosYLluvias' })
    async obtenerPluviometrosYLluvias(
        @Args('filterLluviasInput') filterLluviasInput: FilterLluviasInput
    ): Promise<Pluviometro[]> {
        return this.pluviometrosService.obtenerPluviometrosYLluviasService(filterLluviasInput);
    }

    @Query(() => [Pluviometro], { name: 'obtenerLluviasYear' })
    async obtenerLluviasYear(@Args('year') year: number): Promise<Pluviometro[]> {
        return this.pluviometrosService.obtenerLluviasYearService(year);
    }
}
