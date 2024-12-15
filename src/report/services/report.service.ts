import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/services/printer.service';
import { getAllJawaban } from '../documents/getAllJawaban.report';
import { InjectRepository } from '@nestjs/typeorm';
import { JawabanEntity } from 'src/jawaban/models/jawaban.entity';
import { Repository } from 'typeorm';
import { getAllJawabanBySubject } from '../documents/getAllJawabanBySubject.report';
import { getAllJawabanByAuthor } from '../documents/getAllJawabanByAuthor.report';
import { getAllJawabanAuthorBySubject } from '../documents/getAllJawabanReportAuthorBySubject.report';

@Injectable()
export class ReportService {
  constructor(
    private printerService: PrinterService,
    @InjectRepository(JawabanEntity)
    private readonly jawabanRepository: Repository<JawabanEntity>,
  ) {}

  async getAllJawabanReport(): Promise<PDFKit.PDFDocument> {
    const jawaban = await this.jawabanRepository.find();

    const docDefinition: TDocumentDefinitions = getAllJawaban(jawaban);

    return this.printerService.createPdf(docDefinition);
  }

  async getAllJawabanReportBySubject(
    subject: string,
  ): Promise<PDFKit.PDFDocument> {
    const jawaban = await this.jawabanRepository.find({ where: { subject } });

    const docDefinition: TDocumentDefinitions = getAllJawabanBySubject(
      jawaban,
      subject,
    );

    return this.printerService.createPdf(docDefinition);
  }

  async getAllJawabanReportByAuthor(
    author: string,
  ): Promise<PDFKit.PDFDocument> {
    const jawaban = await this.jawabanRepository.find({
      where: { author: { id: author } },
    });

    const docDefinition: TDocumentDefinitions = getAllJawabanByAuthor(jawaban);

    return this.printerService.createPdf(docDefinition);
  }

  formatTanggal(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long', // Nama bulan sebagai string
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  }

  async getAllJawabanReportAuthorBySubject(
    author: string,
    subject: string,
  ): Promise<PDFKit.PDFDocument> {
    const jawaban = await this.jawabanRepository.find({
      where: { author: { id: author }, subject },
    });

    const jawabanFormatted = jawaban.map((item) => ({
      ...item,
      createdAt: this.formatTanggal(item.createdAt),
    }));

    const docDefinition: TDocumentDefinitions = getAllJawabanAuthorBySubject(
      jawabanFormatted,
      subject,
    );

    return this.printerService.createPdf(docDefinition);
  }
}
