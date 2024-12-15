import { Module } from '@nestjs/common';
import { PrinterController } from './controllers/printer.controller';
import { PrinterService } from './services/printer.service';

@Module({
  controllers: [PrinterController],
  providers: [PrinterService],
  exports: [PrinterService],
})
export class PrinterModule {}
