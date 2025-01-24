import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionesFertilizanteInput } from './create-aplicaciones-fertilizante.input';

@InputType()
export class UpdateAplicacionesFertilizanteInput extends PartialType(CreateAplicacionesFertilizanteInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_aplicaciones_fertilizantes: number;
}
