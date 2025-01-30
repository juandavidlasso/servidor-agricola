import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionHerbicidaInput } from './create-aplicacion-herbicida.input';

@InputType()
export class UpdateAplicacionHerbicidaInput extends PartialType(CreateAplicacionHerbicidaInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_aphe: number;

    @Field(() => Boolean, { nullable: false })
    @IsNotEmpty()
    @IsBoolean()
    duplicate: boolean;
}
