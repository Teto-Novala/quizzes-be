import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SoalService } from '../services/soal.service';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateSoal } from '../models/dto/create/create-soal.dto';

@Controller('soal')
export class SoalController {
  constructor(private soalService: SoalService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createSoal(@Body() createDto: CreateSoal, @Request() req) {
    return this.soalService.createSoal(req.user, createDto);
  }
}
