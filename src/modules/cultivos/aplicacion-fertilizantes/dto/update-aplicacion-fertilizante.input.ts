import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionFertilizanteInput } from './create-aplicacion-fertilizante.input';

@InputType()
export class UpdateAplicacionFertilizanteInput extends PartialType(CreateAplicacionFertilizanteInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_apfe: number;

    @Field(() => Boolean, { nullable: false })
    @IsNotEmpty()
    @IsBoolean()
    duplicate: boolean;
}
