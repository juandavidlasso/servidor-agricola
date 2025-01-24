import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTratamientoPlagasInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    producto: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    unidad: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    tiempo: string;
}
