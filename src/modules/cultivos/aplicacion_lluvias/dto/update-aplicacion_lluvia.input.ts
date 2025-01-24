import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionLluviaInput } from './create-aplicacion_lluvia.input';

@InputType()
export class UpdateAplicacionLluviaInput extends PartialType(CreateAplicacionLluviaInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_aplicacion_lluvia: number;
}
