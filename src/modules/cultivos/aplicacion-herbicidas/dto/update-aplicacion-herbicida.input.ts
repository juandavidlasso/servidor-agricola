import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionHerbicidaInput } from './create-aplicacion-herbicida.input';

@InputType()
export class UpdateAplicacionHerbicidaInput extends PartialType(CreateAplicacionHerbicidaInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_aphe: number;
}
