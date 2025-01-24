import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMantenimientoInput } from './create-mantenimiento.input';

@InputType()
export class UpdateMantenimientoInput extends PartialType(CreateMantenimientoInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    idMantenimiento: number;
}
