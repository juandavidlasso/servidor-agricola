import { Module } from '@nestjs/common';
import { TratamientoHerbicidasService } from './tratamiento-herbicidas.service';
import { TratamientoHerbicidasResolver } from './tratamiento-herbicidas.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { TratamientoHerbicida } from './entities/tratamiento-herbicida.entity';

@Module({
    imports: [SequelizeModule.forFeature([TratamientoHerbicida])],
    providers: [TratamientoHerbicidasResolver, TratamientoHerbicidasService],
    exports: [TratamientoHerbicidasService]
})
export class TratamientoHerbicidasModule {}
