import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAplicacionMantenimientoInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    fecha: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    maquinariaId: number;
}
