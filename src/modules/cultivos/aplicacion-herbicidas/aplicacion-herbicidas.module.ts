import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionHerbicidasService } from './aplicacion-herbicidas.service';
import { AplicacionHerbicidasResolver } from './aplicacion-herbicidas.resolver';
import { AplicacionHerbicida } from './entities/aplicacion-herbicida.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionHerbicida])],
    providers: [AplicacionHerbicidasResolver, AplicacionHerbicidasService],
    exports: [AplicacionHerbicidasService]
})
export class AplicacionHerbicidasModule {}
