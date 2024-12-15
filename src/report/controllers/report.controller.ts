import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async getAllJawabanReport(@Res() response: Response) {
    const pdfDoc = this.reportService.getAllJawabanReport();

    (await pdfDoc).info.Title = 'Hasil Semua Nilai';
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="laporan_nilai.pdf"',
    );
    (await pdfDoc).pipe(response);
    (await pdfDoc).end();
  }

  @Get('subject/:subject')
  async getAllJawabanBySubject(
    @Param('subject') subject: string,
    @Res() response: Response,
  ) {
    const pdfDoc = this.reportService.getAllJawabanReportBySubject(subject);

    (await pdfDoc).info.Title = `Hasil Semua Nilai ${subject}`;
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="laporan_nilai_${subject}.pdf"`,
    );
    (await pdfDoc).pipe(response);
    (await pdfDoc).end();
  }

  @Get('user/:id')
  async getAllJawabanByAuthor(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const pdfDoc = this.reportService.getAllJawabanReportByAuthor(id);

    (await pdfDoc).info.Title = `Hasil Semua Nilai User`;
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="laporan_nilai_${id}.pdf"`,
    );
    (await pdfDoc).pipe(response);
    (await pdfDoc).end();
  }
  @Get('user/:id/subject/:subject')
  async getAllJawabanAuthorBySubject(
    @Param('id') id: string,
    @Param('subject') subject: string,
    @Res() response: Response,
  ) {
    const pdfDoc = this.reportService.getAllJawabanReportAuthorBySubject(
      id,
      subject,
    );

    (await pdfDoc).info.Title = `Hasil Nilai ${subject}`;
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="laporan_nilai_${id}.pdf"`,
    );
    (await pdfDoc).pipe(response);
    (await pdfDoc).end();
  }
}
