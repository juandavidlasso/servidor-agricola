import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcryptjs from 'bcryptjs';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Usuarios } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectModel(Usuarios)
        private readonly userRepository: typeof Usuarios
    ) {}

    // Creo usuario en la DB
    async crearUsuarioService(createUsuarioInput: CreateUsuarioInput): Promise<Usuarios> {
        try {
            return await this.userRepository.create({
                ...createUsuarioInput,
                password: bcryptjs.hashSync(createUsuarioInput.password, 10)
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Obtengo todos los usuarios de la DB
    async obtenerUsuariosService(): Promise<Usuarios[]> {
        try {
            const users = await this.userRepository.findAll();

            if (!users.length) throw new Error('No hay usuarios registrados.');

            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Obtengo un usuario de la DB
    async obtenerUsuarioService(id_usuario: number): Promise<Usuarios> {
        try {
            const user = await this.userRepository.findOne({ where: { id_usuario } });

            if (!user) throw new Error('El usuario no esta registrado.');

            return user.dataValues;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Obtengo un usuario por email de la DB
    async obtenerUsuarioEmailService(email: string): Promise<Usuarios> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });

            if (!user) throw new Error('El usuario no esta registrado.');

            return user.dataValues;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Actualizo un usuario de la DB
    async actualizarUsuarioService(id_usuario: number, updateUsuarioInput: UpdateUsuarioInput): Promise<Usuarios> {
        try {
            const user = await this.userRepository.findOne({ where: { id_usuario } });

            if (!user) throw new Error('El usuario no esta registrado.');

            if (updateUsuarioInput.password) {
                updateUsuarioInput.password = bcryptjs.hashSync(updateUsuarioInput.password, 10);
            }

            return await user.update(updateUsuarioInput);
        } catch (error) {
            throw new Error(error);
        }
    }
}
