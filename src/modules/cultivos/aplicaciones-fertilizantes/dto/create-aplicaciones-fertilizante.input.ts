import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateAplicacionesFertilizanteInput {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    apfe_id: number;
}
