import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    pluviometro_id: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    lluvia_id: number;
}
