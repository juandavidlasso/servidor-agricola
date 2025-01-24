import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLluviaInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    fecha: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    cantidad: number;
}

@InputType()
export class FilterLluviaInput {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_pluviometro: number;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    inicial?: number;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    final?: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    year: number;
}

@InputType()
export class FilterLluviaMesYearInput {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    month: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    year: number;
}
