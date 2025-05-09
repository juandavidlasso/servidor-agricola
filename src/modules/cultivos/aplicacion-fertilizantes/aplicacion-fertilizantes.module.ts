import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionFertilizantesService } from './aplicacion-fertilizantes.service';
import { AplicacionFertilizantesResolver } from './aplicacion-fertilizantes.resolver';
import { AplicacionFertilizante } from './entities/aplicacion-fertilizante.entity';
import { TratamientoFertilizante } from '../tratamiento-fertilizantes/entities/tratamiento-fertilizante.entity';
import { AplicacionesFertilizante } from '../aplicaciones-fertilizantes/entities/aplicaciones-fertilizante.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionFertilizante, TratamientoFertilizante, AplicacionesFertilizante])],
    providers: [AplicacionFertilizantesResolver, AplicacionFertilizantesService],
    exports: [AplicacionFertilizantesService]
})
export class AplicacionFertilizantesModule {}
