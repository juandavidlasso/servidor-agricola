import { Module } from '@nestjs/common';
import { AplicacionMantenimientosService } from './aplicacion-mantenimientos.service';
import { AplicacionMantenimientosResolver } from './aplicacion-mantenimientos.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionMantenimiento } from './entities/aplicacion-mantenimiento.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionMantenimiento])],
    providers: [AplicacionMantenimientosResolver, AplicacionMantenimientosService],
    exports: [AplicacionMantenimientosService]
})
export class AplicacionMantenimientosModule {}
