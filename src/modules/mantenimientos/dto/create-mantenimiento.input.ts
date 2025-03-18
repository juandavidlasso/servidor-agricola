import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMantenimientoInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    detalle?: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    horaCambio: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    proximoCambio: number;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    tipoCambio: boolean;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    cantidad: string

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    insumoId: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    ApMantId: number;
}
