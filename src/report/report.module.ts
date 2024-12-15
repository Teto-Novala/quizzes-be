import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { PrinterModule } from 'src/printer/printer.module';
import { JawabanModule } from 'src/jawaban/jawaban.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JawabanEntity } from 'src/jawaban/models/jawaban.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JawabanEntity]),
    PrinterModule,
    JawabanModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
