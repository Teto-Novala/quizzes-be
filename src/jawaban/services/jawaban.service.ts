import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JawabanEntity } from '../models/jawaban.entity';
import { Repository } from 'typeorm';
import { SoalEntity } from 'src/soal/models/soal.entity';
import { CreateJawaban } from '../models/dto/create/create-jawaban.dto';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { Soal } from 'src/soal/models/dto/soal.dto';
import { User } from 'src/auth/models/dto/user.dto';
import { Jawaban } from '../models/dto/jawaban.dto';

@Injectable()
export class JawabanService {
  constructor(
    @InjectRepository(JawabanEntity)
    private readonly jawabanRepository: Repository<JawabanEntity>,
    @InjectRepository(SoalEntity)
    private readonly soalRepository: Repository<SoalEntity>,
  ) {}

  nilaiFunction(benar: number, jumlahSoal: number) {
    return (benar / jumlahSoal) * 100;
  }

  createJawaban(
    createJawabanDto: CreateJawaban,
    user: User,
  ): Observable<{ message: string; id: string }> {
    return from(
      this.soalRepository.find({
        where: {
          noModel: createJawabanDto.noModel,
          subject: createJawabanDto.subject,
        },
      }),
    ).pipe(
      switchMap((soal: Soal[]) => {
        let benar = 0;
        let salah = 0;
        let nilai = 0;

        if (createJawabanDto.jawaban.length < soal.length) {
          salah += soal.length - createJawabanDto.jawaban.length;
        }

        soal.forEach((item, index) => {
          for (let i = 0; i < createJawabanDto.jawaban.length; i++) {
            if (item.id === createJawabanDto.jawaban[i].id) {
              if (item.jawaban === createJawabanDto.jawaban[i].jawaban) {
                benar += 1;
              }
              if (item.jawaban !== createJawabanDto.jawaban[i].jawaban) {
                salah += 1;
              }
            }
          }
        });

        nilai += this.nilaiFunction(benar, soal.length);

        const payload = this.jawabanRepository.create({
          author: user,
          namaUser: user.namaLengkap,
          subject: createJawabanDto.subject,
          noModel: createJawabanDto.noModel,
          benar,
          salah,
          nilai,
        });

        return from(this.jawabanRepository.save(payload)).pipe(
          map((jawaban: Jawaban) => {
            return {
              message: 'Berhasil membuat jawaban',
              id: jawaban.id,
            };
          }),
        );
      }),
    );
  }

  getJawabanForUser(id: string): Observable<Jawaban> {
    return from(this.jawabanRepository.findOneBy({ id })).pipe(
      map((jawaban: Jawaban) => {
        if (jawaban) {
          return jawaban;
        }
      }),
    );
  }

  getAllJawaban(): Observable<Jawaban[]> {
    return from(this.jawabanRepository.find());
  }

  getAllJawabanBySubject(subject: string): Observable<Jawaban[]> {
    return from(this.jawabanRepository.find({ where: { subject } })).pipe(
      map((jawaban: Jawaban[]) => {
        return jawaban;
      }),
    );
  }

  getAllJawabanByAuthor(author: string): Observable<Jawaban[]> {
    return from(
      this.jawabanRepository.find({ where: { author: { id: author } } }),
    );
  }

  getAllJawabanBySubjectAndAuthor(
    subject: string,
    author: string,
  ): Observable<Jawaban[]> {
    return from(
      this.jawabanRepository.find({
        where: { author: { id: author }, subject },
      }),
    );
  }
}
