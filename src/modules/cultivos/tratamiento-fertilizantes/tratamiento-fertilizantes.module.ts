import { Module } from '@nestjs/common';
import { TratamientoFertilizantesService } from './tratamiento-fertilizantes.service';
import { TratamientoFertilizantesResolver } from './tratamiento-fertilizantes.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { TratamientoFertilizante } from './entities/tratamiento-fertilizante.entity';

@Module({
    imports: [SequelizeModule.forFeature([TratamientoFertilizante])],
    providers: [TratamientoFertilizantesResolver, TratamientoFertilizantesService],
    exports: [TratamientoFertilizantesService]
})
export class TratamientoFertilizantesModule {}
