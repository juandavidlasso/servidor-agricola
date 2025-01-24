import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionMantenimientoInput } from './create-aplicacion-mantenimiento.input';

@InputType()
export class UpdateAplicacionMantenimientoInput extends PartialType(CreateAplicacionMantenimientoInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    idApMant: number;
}
