import { Module } from '@nestjs/common';
import { JawabanController } from './controllers/jawaban.controller';
import { JawabanService } from './services/jawaban.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JawabanEntity } from './models/jawaban.entity';
import { SoalEntity } from 'src/soal/models/soal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JawabanEntity, SoalEntity])],
  controllers: [JawabanController],
  providers: [JawabanService],
  exports: [JawabanService],
})
export class JawabanModule {}
