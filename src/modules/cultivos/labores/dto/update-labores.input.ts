import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateLaboresInput } from './create-labores.input';

@InputType()
export class UpdateLaboresInput extends PartialType(CreateLaboresInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_labor: number;
}
