import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './config';
import * as config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(config.default().mongoUri),
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
