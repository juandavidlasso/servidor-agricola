import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateNoteInput } from './create-note.input';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    id_note: number;
}
