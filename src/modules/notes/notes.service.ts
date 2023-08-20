import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './entities/note.entity';
import { Model } from 'mongoose';
import { CreateNoteDto } from './entities/create-note.dto';
import { UnsplashService } from 'src/general-services/unsplash.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private NoteModel: Model<NoteDocument>,
    private UnsplashService: UnsplashService,
  ) {}

  async getAllSavedNotes() {
    try {
      const savedNotes = await this.NoteModel.find({ saved: true });
      return savedNotes;
    } catch (error) {
      throw error;
    }
  }

  async getSeenNotes() {
    try {
      const seenNotes = await this.NoteModel.find({ seenAt: { $ne: null } });
      return seenNotes;
    } catch (error) {
      throw error;
    }
  }

  async getRandomNote(): Promise<Note> {
    try {
      const unseenNotes = await this.NoteModel.find({ seenAt: null });

      if (unseenNotes.length > 0) {
        const randomNote =
          unseenNotes[Math.floor(Math.random() * unseenNotes.length)];
        return randomNote;
      } else return null;
    } catch (error) {
      throw error;
    }
  }

  async addNote(newNoteDto: CreateNoteDto) {
    try {
      const newNote = await this.NoteModel.create(newNoteDto);
      return newNote;
    } catch (error) {
      throw error;
    }
  }

  async updateNote(noteId: string) {
    try {
      // Find the note by its ID and check if seenAt is not null
      const existingNote = await this.NoteModel.findById(noteId);
      if (!existingNote) {
        return 'Note not found';
      }

      if (existingNote.seenAt !== null) {
        return 'This note has already been opened before';
      }

      // If note.seenAt is null, update it with the current date and time
      const updatedNote = await this.NoteModel.findOneAndUpdate(
        { _id: noteId },
        { seenAt: new Date() },
        { new: true }, // Return the updated document
      );
      return updatedNote;
    } catch (error) {
      // Handle any errors that occur
      throw error;
    }
  }

  async toggleSavedNote(noteId: string, isSaved: any) {
    try {
      isSaved = isSaved === 'true';
      const updatedNote = await this.NoteModel.findOneAndUpdate(
        { _id: noteId },
        { $set: { saved: isSaved } },
      );
      console.log(updatedNote);
      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async getNoteById(noteId: string) {
    try {
      return await this.NoteModel.findOne({ _id: noteId });
    } catch (error) {
      throw error;
    }
  }

  async getUnsplashImage() {
    try {
      const randomImg = await this.UnsplashService.getImage();
      console.log(randomImg);
      if (!randomImg) return null;
      return randomImg;
    } catch (error) {
      throw error;
    }
  }
}
