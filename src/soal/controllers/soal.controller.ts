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
import { Soal } from '../models/dto/soal.dto';

@Controller('soal')
export class SoalController {
  constructor(private soalService: SoalService) {}
}
