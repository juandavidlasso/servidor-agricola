import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth-input';
import { AuthResponse } from './types/auth-response';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthResponse, { name: 'autenticarUsuario' })
    async autenticarUsuario(@Args('authInput') authInput: AuthInput): Promise<AuthResponse> {
        return await this.authService.autenticarUsuarioService(authInput);
    }
}
