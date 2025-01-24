import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateSuerteInput } from './create-suerte.input';

@InputType()
export class UpdateSuerteInput extends PartialType(CreateSuerteInput) {
    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    id_suerte: number;
}
