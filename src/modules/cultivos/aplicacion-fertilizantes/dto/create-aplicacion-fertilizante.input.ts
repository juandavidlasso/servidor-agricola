import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAplicacionFertilizanteInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    fecha: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    tipo: string;
}
