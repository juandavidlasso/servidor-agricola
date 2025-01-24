import { Module } from '@nestjs/common';
import { TratamientoPlagasService } from './tratamiento-plagas.service';
import { TratamientoPlagasResolver } from './tratamiento-plagas.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { TratamientoPlagas } from './entities/tratamiento-plagas.entity';

@Module({
    imports: [SequelizeModule.forFeature([TratamientoPlagas])],
    providers: [TratamientoPlagasResolver, TratamientoPlagasService],
    exports: [TratamientoPlagasService]
})
export class TratamientoPlagasModule {}
