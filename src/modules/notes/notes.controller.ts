import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Param,
  Res,
  Body,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './entities/create-note.dto';

@ApiTags('Note')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('seen')
  async GetSeenNotes(@Req() req: any, @Res() res: any) {
    try {
      const data = await this.notesService.getSeenNotes();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('random')
  async GetRandomNote(@Req() req: any, @Res() res: any) {
    try {
      const ransomNote = await this.notesService.getRandomNote();
      return res.status(200).json({ success: true, data: ransomNote });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async CreateNote(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreateNoteDto,
  ) {
    try {
      const newNote = await this.notesService.addNote(body);
      return res.status(200).json({ success: true, data: newNote });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/img')
  async GetRandomImage(@Req() req: any, @Res() res: any) {
    try {
      const data = await this.notesService.getUnsplashImage();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update-seen-note')
  async UpdateSeenNote(
    @Req() req: any,
    @Res() res: any,
    @Body('id') id: string,
  ) {
    try {
      const data = await this.notesService.updateNote(id);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('toggle-saved/:id')
  async ToggleSavedNote(
    @Req() req: any,
    @Res() res: any,
    @Param('id') id: string,
    @Query('isSaved') isSaved: string,
  ) {
    try {
      const data = await this.notesService.toggleSavedNote(id, isSaved);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('saved')
  async GetAllSavedNotes(@Req() req: any, @Res() res: any) {
    try {
      const data = await this.notesService.getAllSavedNotes();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
