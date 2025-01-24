import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRiegoInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    fecha: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsNotEmpty()
    num_riego: number;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsNotEmpty()
    corte_id: number;
}
