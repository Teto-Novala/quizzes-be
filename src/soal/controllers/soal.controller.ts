import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SoalService } from '../services/soal.service';
import { Observable } from 'rxjs';
import { CreateSoal } from '../models/dto/create-soal.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
}
