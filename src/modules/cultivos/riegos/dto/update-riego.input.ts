import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRiegoInput } from './create-riego.input';

@InputType()
export class UpdateRiegoInput extends PartialType(CreateRiegoInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_riego: number;
}
