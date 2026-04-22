import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { Note } from './entities/note.entity';

@Module({
    providers: [NotesResolver, NotesService],
    imports: [SequelizeModule.forFeature([Note])],
    exports: [NotesService]
})
export class NotesModule {}
