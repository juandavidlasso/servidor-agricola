import { Module } from '@nestjs/common';
import { AplicacionesFertilizantesService } from './aplicaciones-fertilizantes.service';
import { AplicacionesFertilizantesResolver } from './aplicaciones-fertilizantes.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionesFertilizante } from './entities/aplicaciones-fertilizante.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionesFertilizante])],
    providers: [AplicacionesFertilizantesResolver, AplicacionesFertilizantesService],
    exports: [AplicacionesFertilizantesService]
})
export class AplicacionesFertilizantesModule {}
