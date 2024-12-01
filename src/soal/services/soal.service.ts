import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalEntity } from '../models/soal.entity';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { CreateSoal } from '../models/dto/create-soal.dto';
import { User } from 'src/auth/models/dto/user.dto';
import { Soal } from '../models/dto/soal.dto';
import { GetSoalByModel } from '../models/dto/get-soal-by-model.dto';
import { UpdateSoal } from '../models/dto/update-soal.dto';
import { DeleteSoal } from '../models/dto/delete-soal.dto';
import { GetSoalRandomModel } from '../models/dto/get-soal-random-model.dto';
import { ModelSoal } from '../models/enums/model.enum';

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

  updateSoal(data: UpdateSoal): Observable<{ message: string }> {
    return from(this.soalRepository.findOneBy({ id: data.id })).pipe(
      switchMap((soal: Soal) => {
        if (soal) {
          return from(this.soalRepository.update(data.id, data)).pipe(
            map(() => {
              return {
                message: 'Berhasil Update',
              };
            }),
          );
        }
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  deleteSoal(id: string): Observable<{ message: string }> {
    return from(this.soalRepository.delete(id)).pipe(
      map(() => {
        return {
          message: 'Berhasil menghapus',
        };
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  getRandomNumberWordBetween1And3(): ModelSoal {
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    switch (randomNumber) {
      case 1:
        return ModelSoal.SATU;
      case 2:
        return ModelSoal.DUA;
      case 3:
        return ModelSoal.TIGA;
      default:
        return ModelSoal.SATU;
    }
  }

  getSoalRandomModel(data: GetSoalRandomModel): Observable<Soal[]> {
    const randomNumber = this.getRandomNumberWordBetween1And3();
    return from(
      this.soalRepository.find({
        where: { model: randomNumber, subject: data.subject },
        select: [
          'id',
          'soal',
          'pilihanA',
          'pilihanB',
          'pilihanC',
          'pilihanD',
          'subject',
        ],
      }),
    ).pipe(
      map((soal: Soal[]) => {
        if (soal) {
          return soal;
        }
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }
}
