import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { Observable } from 'rxjs';
import { SubjectDto } from '../models/dto/subject.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateSubjectDto } from '../models/dto/create/create-subject.dto';
import { UpdateSubjectDto } from '../models/dto/update/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllSubject(): Observable<SubjectDto[]> {
    return this.subjectService.getAllSubject();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getSubjectById(@Param('id') id: string): Observable<SubjectDto> {
    return this.subjectService.getSubjectByid(id);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createSubject(
    @Body() createSubjectDto: CreateSubjectDto,
  ): Observable<{ message: string; subject: SubjectDto }> {
    return this.subjectService.createSubject(createSubjectDto);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  updateSubject(
    @Body()
    updateSubjectDto: UpdateSubjectDto,
  ): Observable<{ message: string }> {
    return this.subjectService.editSubjet(updateSubjectDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteSubject(@Param('id') id: string): Observable<{ message: string }> {
    return this.subjectService.deleteSubject(id);
  }
}
