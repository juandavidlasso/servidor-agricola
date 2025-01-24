import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SuertesService } from './suertes.service';
import { SuertesResolver } from './suertes.resolver';
import { Suerte } from './entities/suerte.entity';
import { Tablon } from '../tablones/entities/tablon.entity';
import { CortesModule } from '../cortes/cortes.module';
import { Cosecha } from '../cosechas/entities/cosecha.entity';

@Module({
    imports: [SequelizeModule.forFeature([Suerte, Tablon, Cosecha]), CortesModule],
    providers: [SuertesResolver, SuertesService],
    exports: [SuertesService]
})
export class SuertesModule {}
