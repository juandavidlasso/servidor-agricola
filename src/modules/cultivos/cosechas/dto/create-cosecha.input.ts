import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCosechaInput {
    @Field(() => Float, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    peso: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    rendimiento?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    numeroVagones?: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    numeroMulas?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    nota?: string;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    corte_id: number;
}
