import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePluviometroInput {
    @Field(() => Int, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    nombre: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    suertesAsociadas?: string;
}
