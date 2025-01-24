import { Module } from '@nestjs/common';
import { AplicacionLluviasService } from './aplicacion_lluvias.service';
import { AplicacionLluviasResolver } from './aplicacion_lluvias.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionLluvia } from './entities/aplicacion_lluvia.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionLluvia])],
    providers: [AplicacionLluviasResolver, AplicacionLluviasService],
    exports: [AplicacionLluviasService]
})
export class AplicacionLluviasModule {}
