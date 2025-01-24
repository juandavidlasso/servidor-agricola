import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateInsumoInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    referencia: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    marca: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    cantidad: string;
}
