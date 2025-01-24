import { Module } from '@nestjs/common';
import { MantenimientosService } from './mantenimientos.service';
import { MantenimientosResolver } from './mantenimientos.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mantenimiento } from './entities/mantenimiento.entity';

@Module({
    imports: [SequelizeModule.forFeature([Mantenimiento])],
    providers: [MantenimientosResolver, MantenimientosService],
    exports: [MantenimientosService]
})
export class MantenimientosModule {}
