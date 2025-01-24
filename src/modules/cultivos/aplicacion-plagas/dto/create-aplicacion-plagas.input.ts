import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAplicacionPlagasInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    fecha: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    tablon_id: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    trapl_id: number;
}
