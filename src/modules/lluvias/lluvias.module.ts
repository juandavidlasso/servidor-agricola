import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { LluviasService } from './lluvias.service';
import { LluviasResolver } from './lluvias.resolver';
import { Lluvia } from './entities/lluvia.entity';
import { Pluviometro } from '../pluviometros/entities/pluviometro.entity';
import { AplicacionLluvia } from '../cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';

@Module({
    imports: [SequelizeModule.forFeature([Lluvia, Pluviometro, AplicacionLluvia])],
    providers: [LluviasResolver, LluviasService],
    exports: [LluviasService]
})
export class LluviasModule {}
