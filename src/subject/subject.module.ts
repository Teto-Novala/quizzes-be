import { Module } from '@nestjs/common';
import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './models/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
