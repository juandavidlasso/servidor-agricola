import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionRiegoInput } from './create-aplicacion-riego.input';

@InputType()
export class UpdateAplicacionRiegoInput extends PartialType(CreateAplicacionRiegoInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_apriego: number;
}
