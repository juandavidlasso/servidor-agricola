import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PluviometrosService } from './pluviometros.service';
import { PluviometrosResolver } from './pluviometros.resolver';
import { Pluviometro } from './entities/pluviometro.entity';

@Module({
    imports: [SequelizeModule.forFeature([Pluviometro])],
    providers: [PluviometrosResolver, PluviometrosService],
    exports: [PluviometrosService]
})
export class PluviometrosModule {}
