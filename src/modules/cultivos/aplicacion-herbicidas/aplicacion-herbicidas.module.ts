import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionHerbicidasService } from './aplicacion-herbicidas.service';
import { AplicacionHerbicidasResolver } from './aplicacion-herbicidas.resolver';
import { AplicacionHerbicida } from './entities/aplicacion-herbicida.entity';
import { TratamientoHerbicida } from '../tratamiento-herbicidas/entities/tratamiento-herbicida.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionHerbicida, TratamientoHerbicida])],
    providers: [AplicacionHerbicidasResolver, AplicacionHerbicidasService],
    exports: [AplicacionHerbicidasService]
})
export class AplicacionHerbicidasModule {}
