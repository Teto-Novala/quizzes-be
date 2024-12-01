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
import { CreateSoal } from '../models/dto/create-soal.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Soal } from '../models/dto/soal.dto';
import { GetSoalByModel } from '../models/dto/get-soal-by-model.dto';
import { UpdateSoal } from '../models/dto/update-soal.dto';
import { DeleteSoal } from '../models/dto/delete-soal.dto';

@Controller('soal')
export class SoalController {
  constructor(private soalService: SoalService) {}

  @UseGuards(JwtGuard)
  @Post()
  createSoal(
    @Body() soal: CreateSoal,
    @Request() req,
  ): Observable<{ message: string }> {
    return this.soalService.createSoal(soal, req.user);
  }

  @UseGuards(JwtGuard)
  @Post('get')
  getSoalByModel(@Body() data: GetSoalByModel): Observable<Soal[]> {
    return this.soalService.getSoalByModel(data);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getSoalById(@Param('id') id: string): Observable<Soal> {
    return this.soalService.getSoalById(id);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  updateSoal(@Body() data: UpdateSoal): Observable<{ message: string }> {
    return this.soalService.updateSoal(data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteSoal(@Param('id') id: string): Observable<{ message: string }> {
    return this.soalService.deleteSoal(id);
  }
}
