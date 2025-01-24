import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionLaboresInput } from './create-aplicacion-labores.input';

@InputType()
export class UpdateAplicacionLaboresInput extends PartialType(CreateAplicacionLaboresInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_aplicacion_labores: number;
}
