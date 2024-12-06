import { Module } from '@nestjs/common';
import { SoalController } from './controllers/soal.controller';
import { SoalService } from './services/soal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalEntity } from './models/soal.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SoalModelModule } from 'src/soal-model/soal-model.module';
import { SoalModelEntity } from 'src/soal-model/models/soalModel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SoalEntity, SoalModelEntity]),
    AuthModule,
  ],
  controllers: [SoalController],
  providers: [SoalService],
})
export class SoalModule {}
