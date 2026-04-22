import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note)
        private readonly noteRepository: typeof Note
    ) {}

    async agregarNotaService(createNoteInput: CreateNoteInput): Promise<Note> {
        try {
            return await this.noteRepository.create(createNoteInput);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async obtenerNotasServices(): Promise<Note[]> {
        try {
            return await this.noteRepository.findAll({
                order: [['date', 'DESC']]
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async actualizarNotaService(id_note: number, updateNoteInput: UpdateNoteInput): Promise<Note> {
        try {
            const note = await this.noteRepository.findOne({
                where: {
                    id_note
                }
            });
            if (!note) throw new Error('La nota no esta registrada');

            return await note.update(updateNoteInput);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async eliminarNotaService(id_note: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.noteRepository.destroy({ where: { id_note } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
