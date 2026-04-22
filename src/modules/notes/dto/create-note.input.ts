import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateNoteInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    date: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    description: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    cost?: number;
}
