import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateTabloneInput {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    numero: number;

    @Field(() => Number, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    area: number;

    @Field(() => Boolean, { nullable: false })
    @IsNotEmpty()
    @IsBoolean()
    estado: boolean;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    corte_id: number;
}
