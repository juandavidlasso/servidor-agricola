import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Resolver(() => Note)
export class NotesResolver {
    constructor(private readonly notesService: NotesService) {}

    @Mutation(() => Note, { name: 'agregarNota' })
    async agregarNota(@Args('createNoteInput') createNoteInput: CreateNoteInput): Promise<Note> {
        return this.notesService.agregarNotaService(createNoteInput);
    }

    @Query(() => [Note], { name: 'obtenerNotas' })
    async obtenerNotas(): Promise<Note[]> {
        return this.notesService.obtenerNotasServices();
    }

    @Mutation(() => Note, { name: 'actualizarNota' })
    async actualizarNota(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput): Promise<Note> {
        return this.notesService.actualizarNotaService(updateNoteInput.id_note, updateNoteInput);
    }

    @Mutation(() => Boolean, { name: 'eliminarNota' })
    async eliminarNota(@Args('id_note', { type: () => Int }) id_note: number): Promise<boolean> {
        return this.notesService.eliminarNotaService(id_note);
    }
}
