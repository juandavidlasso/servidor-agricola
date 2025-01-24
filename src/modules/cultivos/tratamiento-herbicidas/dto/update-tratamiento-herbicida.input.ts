import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTratamientoHerbicidaInput } from './create-tratamiento-herbicida.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTratamientoHerbicidaInput extends PartialType(CreateTratamientoHerbicidaInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_trahe: number;
}
