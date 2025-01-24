import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { AuthResponse } from './types/auth-response';
import { AuthInput } from './dto/auth-input';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService
    ) {}

    async autenticarUsuarioService(authInput: AuthInput): Promise<AuthResponse> {
        try {
            // Consulto si el usuairo esta registrado
            const user = await this.usuarioService.obtenerUsuarioEmailService(authInput.email);

            // Comparo si la contrasena es igual
            if (!bcryptjs.compareSync(authInput.password, user.password)) throw new Error('Email o contraseña incorrecto.');

            // Creo el token con el id del usuario
            const token = await this.jwtService.signAsync({
                id_usuario: user.id_usuario
            });

            return {
                token,
                user
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async validateUserService(id: number): Promise<Usuarios> {
        try {
            const user = await this.usuarioService.obtenerUsuarioService(id);

            delete user.password;

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}
