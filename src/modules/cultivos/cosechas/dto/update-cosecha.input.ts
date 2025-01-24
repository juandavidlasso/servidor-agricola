import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCosechaInput } from './create-cosecha.input';

@InputType()
export class UpdateCosechaInput extends PartialType(CreateCosechaInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_cosecha: number;
}
