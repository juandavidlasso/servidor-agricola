import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionPlagasInput } from './create-aplicacion-plagas.input';

@InputType()
export class UpdateAplicacionPlagasInput extends PartialType(CreateAplicacionPlagasInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_apla: number;
}
