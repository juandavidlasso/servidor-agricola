import { Field, ObjectType } from '@nestjs/graphql';
import { Usuarios } from '@modules/usuarios/entities/usuario.entity';

@ObjectType()
export class AuthResponse {
    @Field(() => String)
    token: string;

    @Field(() => Usuarios)
    user: Usuarios;
}
