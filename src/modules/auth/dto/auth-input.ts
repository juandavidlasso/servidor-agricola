import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class AuthInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password: string;
}
