import mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  strict: false,
})
export class Note {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: null })
  img: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  youtubeUrl: string;

  @Prop({ default: null })
  seenAt: number;

  @Prop({ default: false })
  saved: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
