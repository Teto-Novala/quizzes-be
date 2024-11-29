import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalEntity } from '../models/soal.entity';
import { Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';
import { CreateSoal } from '../models/dto/create-soal.dto';
import { User } from 'src/auth/models/dto/user.dto';
import { Soal } from '../models/dto/soal.dto';

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
}
