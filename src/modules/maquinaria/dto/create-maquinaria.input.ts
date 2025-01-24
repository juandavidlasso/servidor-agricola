import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMaquinariaInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    marca: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    serie: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    modelo: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    potencia: number;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    color: string;
}
