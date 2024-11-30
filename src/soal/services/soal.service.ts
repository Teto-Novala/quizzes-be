import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalEntity } from '../models/soal.entity';
import { Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';
import { CreateSoal } from '../models/dto/create-soal.dto';
import { User } from 'src/auth/models/dto/user.dto';
import { Soal } from '../models/dto/soal.dto';
import { GetSoalByModel } from '../models/dto/get-soal-by-model.dto';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalEntity)
    private readonly soalRepository: Repository<SoalEntity>,
  ) {}

  createSoal(soal: CreateSoal, user: User): Observable<{ message: string }> {
    soal.author = user;
    return from(this.soalRepository.save(soal)).pipe(
      map((soal: Soal) => {
        if (soal) {
          return {
            message: 'Berhasil membuat soal',
          };
        }
      }),
    );
  }

  getSoalByModel(data: GetSoalByModel): Observable<Soal[]> {
    return from(
      this.soalRepository.find({
        where: { model: data.model, author: { id: data.author } },
      }),
    ).pipe(
      map((soal: Soal[]) => {
        if (soal) {
          return soal;
        }
      }),
    );
  }

  getSoalById(id: string): Observable<Soal> {
    return from(
      this.soalRepository.findOne({
        where: { id },
      }),
    ).pipe(
      map((soal: Soal) => {
        if (soal) {
          return soal;
        } else {
          throw new NotFoundException('Soal tidak ditemukan');
        }
      }),
    );
  }
}
