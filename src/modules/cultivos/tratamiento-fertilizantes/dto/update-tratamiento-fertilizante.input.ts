import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTratamientoFertilizanteInput } from './create-tratamiento-fertilizante.input';

@InputType()
export class UpdateTratamientoFertilizanteInput extends PartialType(CreateTratamientoFertilizanteInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_trafe: number;
}
