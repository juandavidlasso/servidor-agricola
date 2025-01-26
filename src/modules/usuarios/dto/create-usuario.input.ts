import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUsuarioInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    apellido: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field(() => Int, { nullable: true, defaultValue: 2 })
    @IsNumber()
    rol?: number;
}
