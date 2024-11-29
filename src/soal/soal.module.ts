import { Module } from '@nestjs/common';
import { SoalController } from './controllers/soal.controller';
import { SoalService } from './services/soal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalEntity } from './models/soal.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SoalEntity]),AuthModule],
  controllers: [SoalController],
  providers: [SoalService],
})
export class SoalModule {}
