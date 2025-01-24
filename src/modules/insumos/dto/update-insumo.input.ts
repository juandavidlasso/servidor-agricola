import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateInsumoInput } from './create-insumo.input';

@InputType()
export class UpdateInsumoInput extends PartialType(CreateInsumoInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    idInsumo: number;
}
