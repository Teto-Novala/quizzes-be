import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SoalModule } from './soal/soal.module';
import { SoalModelModule } from './soal-model/soal-model.module';
import { SubjectModule } from './subject/subject.module';
import { JawabanModule } from './jawaban/jawaban.module';
import { ReportModule } from './report/report.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: parseInt(<string>process.env.POSTGRE_PORT),
      username: process.env.POSTGRE_USER,
      password: process.env.POSTGRE_PASSWORD,
      database: process.env.POSTGRE_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    SoalModule,
    SoalModelModule,
    SubjectModule,
    JawabanModule,
    ReportModule,
    PrinterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
