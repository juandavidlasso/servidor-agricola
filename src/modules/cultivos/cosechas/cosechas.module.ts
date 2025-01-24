import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CosechasService } from './cosechas.service';
import { CosechasResolver } from './cosechas.resolver';
import { Cosecha } from './entities/cosecha.entity';
import { Tablon } from '../tablones/entities/tablon.entity';

@Module({
    imports: [SequelizeModule.forFeature([Cosecha, Tablon])],
    providers: [CosechasResolver, CosechasService],
    exports: [CosechasService]
})
export class CosechasModule {}
