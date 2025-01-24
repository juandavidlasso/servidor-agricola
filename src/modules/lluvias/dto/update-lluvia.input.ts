import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateLluviaInput } from './create-lluvia.input';

@InputType()
export class UpdateLluviaInput extends PartialType(CreateLluviaInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_lluvia: number;
}
