import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { LaboresService } from './labores.service';
import { LaboresResolver } from './labores.resolver';
import { Labores } from './entities/labores.entity';

@Module({
    imports: [SequelizeModule.forFeature([Labores])],
    providers: [LaboresResolver, LaboresService],
    exports: [LaboresService]
})
export class LaboresModule {}
