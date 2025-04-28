import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { LaboresService } from './labores.service';
import { LaboresResolver } from './labores.resolver';
import { Labores } from './entities/labores.entity';
import { AplicacionLabores } from '../aplicacion-labores/entities/aplicacion-labores.entity';

@Module({
    imports: [SequelizeModule.forFeature([Labores, AplicacionLabores])],
    providers: [LaboresResolver, LaboresService],
    exports: [LaboresService]
})
export class LaboresModule {}
