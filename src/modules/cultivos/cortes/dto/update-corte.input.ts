import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCorteInput } from './create-corte.input';

@InputType()
export class UpdateCorteInput extends PartialType(CreateCorteInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_corte: number;
}
