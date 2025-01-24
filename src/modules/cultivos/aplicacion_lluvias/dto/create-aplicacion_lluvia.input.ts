import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateAplicacionLluviaInput {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    pluviometro_id: number;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    lluvia_id: number;
}
