import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AplicacionesHerbicidasService } from './aplicaciones_herbicidas.service';
import { AplicacionesHerbicidasResolver } from './aplicaciones_herbicidas.resolver';
import { AplicacionesHerbicida } from './entities/aplicaciones_herbicida.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionesHerbicida])],
    providers: [AplicacionesHerbicidasResolver, AplicacionesHerbicidasService],
    exports: [AplicacionesHerbicidasService]
})
export class AplicacionesHerbicidasModule {}
