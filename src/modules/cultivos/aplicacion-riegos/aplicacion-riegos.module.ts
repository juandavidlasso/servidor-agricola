import { Module } from '@nestjs/common';
import { AplicacionRiegosService } from './aplicacion-riegos.service';
import { AplicacionRiegosResolver } from './aplicacion-riegos.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { AplicacionRiego } from './entities/aplicacion-riego.entity';

@Module({
    imports: [SequelizeModule.forFeature([AplicacionRiego])],
    providers: [AplicacionRiegosResolver, AplicacionRiegosService],
    exports: [AplicacionRiegosService]
})
export class AplicacionRiegosModule {}
