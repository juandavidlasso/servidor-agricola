import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateSuerteInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    @IsNumber()
    area?: number;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    variedad: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    zona: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    renovada: string;
}

@InputType()
export class ProntuarioInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    nombre?: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    fecha_inicio: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    fecha_fin: string;
}
