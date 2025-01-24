import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCorteInput {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    numero: number;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    fecha_siembra: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    fecha_inicio: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    fecha_corte?: string;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    @Field(() => Boolean, { nullable: false })
    @IsNotEmpty()
    @IsBoolean()
    estado: boolean;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    area?: number;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    suerte_id: number;
}
