import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CortesService } from './cortes.service';
import { CortesResolver } from './cortes.resolver';
import { Corte } from './entities/corte.entity';

@Module({
    imports: [SequelizeModule.forFeature([Corte])],
    providers: [CortesResolver, CortesService],
    exports: [CortesService]
})
export class CortesModule {}
