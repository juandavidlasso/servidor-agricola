import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLaboresInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    fecha: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    actividad: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    equipo?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    estado?: string;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    @IsOptional()
    pases?: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    aplico?: string;

    @Field(() => Number, { nullable: true })
    @IsNumber()
    @IsOptional()
    costo?: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    nota?: string;
}
