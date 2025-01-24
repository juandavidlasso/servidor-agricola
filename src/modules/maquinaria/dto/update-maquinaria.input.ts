import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMaquinariaInput } from './create-maquinaria.input';

@InputType()
export class UpdateMaquinariaInput extends PartialType(CreateMaquinariaInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    idMaquinaria: number;
}
