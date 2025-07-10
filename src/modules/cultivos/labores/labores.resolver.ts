import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LaboresService } from './labores.service';
import { Labores } from './entities/labores.entity';
import { CreateLaboresInput } from './dto/create-labores.input';
import { UpdateLaboresInput } from './dto/update-labores.input';

@Resolver(() => Labores)
export class LaboresResolver {
    constructor(private readonly laboresService: LaboresService) {}

    @Mutation(() => Labores, { name: 'agregarLabor' })
    async agregarLabor(@Args('createLaboresInput') createLaboresInput: CreateLaboresInput): Promise<Labores> {
        return await this.laboresService.agregarLaborService(createLaboresInput);
    }

    @Query(() => [Labores], { name: 'obtenerLabores' })
    async obtenerLabores(): Promise<Labores[]> {
        return await this.laboresService.obtenerLaboresService();
    }

    @Mutation(() => Labores, { name: 'actualizarLabor' })
    async actualizarLabor(@Args('updateLaboresInput') updateLaboresInput: UpdateLaboresInput): Promise<Labores> {
        return await this.laboresService.actualizarLaborService(updateLaboresInput.id_labor, updateLaboresInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarLabor' })
    async eliminarLabor(@Args('id_labor', { type: () => Int }) id_labor: number): Promise<boolean> {
        return await this.laboresService.eliminarLaborService(id_labor);
    }
}
