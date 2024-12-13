import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JawabanService } from '../services/jawaban.service';
import { CreateJawaban } from '../models/dto/create/create-jawaban.dto';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Jawaban } from '../models/dto/jawaban.dto';

@Controller('jawaban')
export class JawabanController {
  constructor(private jawabanService: JawabanService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createjawaban(
    @Body() createJawabanDto: CreateJawaban,
    @Req() req,
  ): Observable<{ message: string; id: string }> {
    return this.jawabanService.createJawaban(createJawabanDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getJawabanForUser(@Param('id') id: string): Observable<Jawaban> {
    return this.jawabanService.getJawabanForUser(id);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllJawaban(): Observable<Jawaban[]> {
    return this.jawabanService.getAllJawaban();
  }

  @UseGuards(JwtGuard)
  @Get('subject/:subject')
  getAllJawabanBySubject(
    @Param('subject') subject: string,
  ): Observable<Jawaban[]> {
    return this.jawabanService.getAllJawabanBySubject(subject);
  }

  @UseGuards(JwtGuard)
  @Get('user/:id')
  getAllJawabanById(@Param('id') id: string): Observable<Jawaban[]> {
    return this.jawabanService.getAllJawabanByAuthor(id);
  }

  @UseGuards(JwtGuard)
  @Get('user/:subject/:id')
  getAllJawabanBySubjectAndAuthor(
    @Param('subject') subject: string,
    @Param('id') author: string,
  ): Observable<Jawaban[]> {
    return this.jawabanService.getAllJawabanBySubjectAndAuthor(subject, author);
  }
}
