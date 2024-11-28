import { Module } from '@nestjs/common';
import { SoalController } from './controllers/soal.controller';
import { SoalService } from './services/soal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalEntity } from './models/soal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoalEntity])],
  controllers: [SoalController],
  providers: [SoalService],
})
export class SoalModule {}
