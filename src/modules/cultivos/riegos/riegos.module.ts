import { Module } from '@nestjs/common';
import { RiegosService } from './riegos.service';
import { RiegosResolver } from './riegos.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Riego } from './entities/riego.entity';

@Module({
    imports: [SequelizeModule.forFeature([Riego])],
    providers: [RiegosResolver, RiegosService],
    exports: [RiegosService]
})
export class RiegosModule {}
