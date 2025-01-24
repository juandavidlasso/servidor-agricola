import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    numeroMulas?: number;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    corte_id: number;
}
