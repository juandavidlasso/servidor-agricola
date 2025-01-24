import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InsumosService } from './insumos.service';
import { InsumosResolver } from './insumos.resolver';
import { Insumo } from './entities/insumo.entity';

@Module({
    imports: [SequelizeModule.forFeature([Insumo])],
    providers: [InsumosResolver, InsumosService],
    exports: [InsumosService]
})
export class InsumosModule {}
