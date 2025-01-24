import { Module } from '@nestjs/common';
import { AplicacionLaboresService } from './aplicacion-labores.service';
import { AplicacionLaboresResolver } from './aplicacion-labores.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionLabores } from './entities/aplicacion-labores.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionLabores])],
    providers: [AplicacionLaboresResolver, AplicacionLaboresService],
    exports: [AplicacionLaboresService]
})
export class AplicacionLaboresModule {}
