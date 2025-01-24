import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAplicacionesHerbicidaInput } from './create-aplicaciones_herbicida.input';

@InputType()
export class UpdateAplicacionesHerbicidaInput extends PartialType(CreateAplicacionesHerbicidaInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_aplicaciones_herbicidas: number;
}
