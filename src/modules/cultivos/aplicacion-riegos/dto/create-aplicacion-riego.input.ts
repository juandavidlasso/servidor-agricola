import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateAplicacionRiegoInput {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    riego_id: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    tablon_id: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    num_tablon: number;
}
