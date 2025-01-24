import { Module } from '@nestjs/common';
import { AplicacionPlagasService } from './aplicacion-plagas.service';
import { AplicacionPlagasResolver } from './aplicacion-plagas.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionPlagas } from './entities/aplicacion-plagas.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionPlagas])],
    providers: [AplicacionPlagasResolver, AplicacionPlagasService],
    exports: [AplicacionPlagasService]
})
export class AplicacionPlagasModule {}
