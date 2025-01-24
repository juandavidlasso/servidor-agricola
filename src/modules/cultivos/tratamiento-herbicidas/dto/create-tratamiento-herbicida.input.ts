import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTratamientoHerbicidaInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    producto: string;

    @Field(() => Float, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    dosis: number;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    presentacion: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    valor: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    aplico: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    nota: string;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    aphe_id: number;
}
