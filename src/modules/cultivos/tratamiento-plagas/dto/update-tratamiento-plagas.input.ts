import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTratamientoPlagasInput } from './create-tratamiento-plagas.input';

@InputType()
export class UpdateTratamientoPlagasInput extends PartialType(CreateTratamientoPlagasInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_trapl: number;
}
