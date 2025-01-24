import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAplicacionHerbicidaInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    fecha: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    tipo: string;
}
