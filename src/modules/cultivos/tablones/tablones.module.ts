import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TablonesService } from './tablones.service';
import { TablonesResolver } from './tablones.resolver';
import { Tablon } from './entities/tablon.entity';

@Module({
    imports: [SequelizeModule.forFeature([Tablon])],
    providers: [TablonesResolver, TablonesService],
    exports: [TablonesService]
})
export class TablonesModule {}
