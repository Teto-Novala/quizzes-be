import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SoalModelService } from '../services/soal-model.service';
import { CreateSoalModel } from '../models/dto/create/create-soal-model.dto';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('soal-model')
export class SoalModelController {
  constructor(private soalModelService: SoalModelService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createModel(
    @Body() createDto: CreateSoalModel,
    @Request() req,
  ): Observable<{ message: string }> {
    return this.soalModelService.createModel(req.user, createDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteModel(@Param('id') id: string): Observable<{ message: string }> {
    return this.soalModelService.deleteModel(id);
  }
}
