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
      const unseenNotes = await this.NoteModel.find({ seenAt: null });
      return unseenNotes;
    } catch (error) {
      throw error;
    }
  }

  async getRandomNote(): Promise<Note> {
    try {
      const unseenNotes = await this.getSeenNotes();

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

  async updateNote(note: any) {
    try {
      const res = await this.NoteModel.findOneAndUpdate(
        { _id: note._id },
        { ...note },
      );
      console.log(res);
    } catch (error) {
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