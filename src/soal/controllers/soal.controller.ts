import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SoalService } from '../services/soal.service';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateSoal } from '../models/dto/create/create-soal.dto';
import { Soal } from '../models/dto/soal.dto';
import { UpdateSoal } from '../models/dto/update/edit-soal.dto';
import { GetRandomDto } from '../models/dto/get/random-soal/random-soal.dto';

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
  @Get(':idSoal')
  getSoalById(@Param('idSoal') idSoal: string): Observable<Soal> {
    return this.soalService.getSoalById(idSoal);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createSoal(@Body() createDto: CreateSoal, @Request() req) {
    return this.soalService.createSoal(req.user, createDto);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  editSoal(@Body() updateSoalDto: UpdateSoal): Observable<{ message: string }> {
    return this.soalService.editSoal(updateSoalDto);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteSoalById(@Param('id') id: string): Observable<{ message: string }> {
    return this.soalService.deleteSoalById(id);
  }

  @Post('random')
  getRandomModelSoalInfo(@Body() getRandomDto: GetRandomDto): Observable<{
    quantity: number;
    time: string;
    timeInSecond: number;
    noModel: number;
    subject: string;
  }> {
    return this.soalService.getRandomModelSoalInfo(getRandomDto);
  }
}
