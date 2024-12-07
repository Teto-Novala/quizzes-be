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
import { SoalModelService } from '../services/soal-model.service';
import { CreateSoalModel } from '../models/dto/create/create-soal-model.dto';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateSoalModel } from '../models/dto/update/update-soal-model.dto';
import { SoalModel } from '../models/dto/soalModel.dto';

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

  @UseGuards(JwtGuard)
  @Put('update')
  updateSoalModel(
    @Body() updateDto: UpdateSoalModel,
  ): Observable<{ message: string }> {
    return this.soalModelService.updateModel(updateDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getAllModelById(@Param('id') id: string): Observable<SoalModel[]> {
    return this.soalModelService.getAllModelById(id);
  }

  @UseGuards(JwtGuard)
  @Get('model/:id')
  getModelById(@Param('id') id: string): Observable<SoalModel> {
    return this.soalModelService.getModelById(id);
  }
}
