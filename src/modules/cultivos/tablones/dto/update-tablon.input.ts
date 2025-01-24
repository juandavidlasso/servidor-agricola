import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTabloneInput } from './create-tablon.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTablonInput extends PartialType(CreateTabloneInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_tablon: number;
}
