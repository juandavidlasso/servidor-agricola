import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { JwtAuthGuard } from '../auth/guards/jwt-authGuard';

@Resolver(() => Usuarios)
export class UsuariosResolver {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Mutation(() => Usuarios, { name: 'crearUsuario' })
    async crearUsuario(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput): Promise<Usuarios> {
        return await this.usuariosService.crearUsuarioService(createUsuarioInput);
    }

    @Query(() => [Usuarios], { name: 'obtenerUsuarios' })
    @UseGuards(JwtAuthGuard)
    async obtenerUsuarios(): Promise<Usuarios[]> {
        return await this.usuariosService.obtenerUsuariosService();
    }

    @Query(() => Usuarios, { name: 'obtenerUsuario' })
    @UseGuards(JwtAuthGuard)
    async obtenerUsuario(@Args('id_usuario', { type: () => Int }) id_usuario: number): Promise<Usuarios> {
        return await this.usuariosService.obtenerUsuarioService(id_usuario);
    }

    @Mutation(() => Usuarios, { name: 'actualizarUsuario' })
    @UseGuards(JwtAuthGuard)
    async actualizarUsuario(@Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput): Promise<Usuarios> {
        return await this.usuariosService.actualizarUsuarioService(updateUsuarioInput.id_usuario, updateUsuarioInput);
    }
}
