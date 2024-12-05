import { Module } from '@nestjs/common';
import { SoalModelService } from './services/soal-model.service';
import { SoalModelController } from './controllers/soal-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalModelEntity } from './models/soalModel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoalModelEntity])],
  providers: [SoalModelService],
  controllers: [SoalModelController],
})
export class SoalModelModule {}
