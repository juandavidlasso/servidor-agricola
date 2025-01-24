import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePluviometroInput } from './create-pluviometro.input';

@InputType()
export class UpdatePluviometroInput extends PartialType(CreatePluviometroInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_pluviometro: number;
}
