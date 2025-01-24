import { Module } from '@nestjs/common';
import { MaquinariaService } from './maquinaria.service';
import { MaquinariaResolver } from './maquinaria.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Maquinaria } from './entities/maquinaria.entity';

@Module({
    imports: [SequelizeModule.forFeature([Maquinaria])],
    providers: [MaquinariaResolver, MaquinariaService],
    exports: [MaquinariaService]
})
export class MaquinariaModule {}
