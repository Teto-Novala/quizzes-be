import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SoalService } from '../services/soal.service';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateSoal } from '../models/dto/create/create-soal.dto';
import { Soal } from '../models/dto/soal.dto';

@Controller('soal')
export class SoalController {
  constructor(private soalService: SoalService) {}

  @UseGuards(JwtGuard)
  @Get(':idUser/:idModel')
  getSoalByModel(
    @Param('idUser') idUser: string,
    @Param('idModel') idModel: string,
  ): Observable<Soal[]> {
    return this.soalService.getSoalByModel(idUser, idModel);
  }

  @UseGuards(JwtGuard)
  @Get(':idUser/:idModel/:noModel')
  getAllSoalByModel(
    @Param('idUser') idUser: string,
    @Param('idModel') idModel: string,
    @Param('noModel', ParseIntPipe) noModel: number,
  ): Observable<Soal[]> {
    return this.soalService.getAllSoalByModel(idUser, idModel, noModel);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createSoal(@Body() createDto: CreateSoal, @Request() req) {
    return this.soalService.createSoal(req.user, createDto);
  }
}
