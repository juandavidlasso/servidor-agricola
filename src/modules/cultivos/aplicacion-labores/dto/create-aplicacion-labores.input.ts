import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateAplicacionLaboresInput {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    labor_id: number;
}
