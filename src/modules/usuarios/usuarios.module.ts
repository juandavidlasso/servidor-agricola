import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { Usuarios } from './entities/usuario.entity';

@Module({
    imports: [SequelizeModule.forFeature([Usuarios])],
    providers: [UsuariosResolver, UsuariosService],
    exports: [UsuariosService]
})
export class UsuariosModule {}
