import { Module } from '@nestjs/common';
import { SubjectController } from './controllers/subject.controller';

@Module({
  controllers: [SubjectController]
})
export class SubjectModule {}
