import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalEntity } from '../models/soal.entity';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/auth/models/dto/user.dto';
import { Soal } from '../models/dto/soal.dto';
import { CreateSoal } from '../models/dto/create/create-soal.dto';
import { SoalModelEntity } from 'src/soal-model/models/soalModel.entity';
import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';
import { UpdateSoal } from '../models/dto/update/edit-soal.dto';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalEntity)
    private readonly soalRepository: Repository<SoalEntity>,
    @InjectRepository(SoalModelEntity)
    private readonly soalModelRepository: Repository<SoalModelEntity>,
  ) {}

  getSoalByModel(idUser: string, idModel: string): Observable<Soal[]> {
    return from(
      this.soalRepository.find({
        where: {
          author: { id: idUser },
          model: { id: idModel },
        },
      }),
    ).pipe(
      map((soal: Soal[]) => {
        return soal;
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  getSoalById(idSoal: string): Observable<Soal> {
    return from(
      this.soalRepository.findOne({
        where: { id: idSoal },
      }),
    ).pipe(
      map((soal: Soal) => {
        return soal;
      }),
      catchError((err) => {
        throw new BadRequestException('Something went wrong');
      }),
    );
  }

  createSoal(
    user: User,
    createDto: CreateSoal,
  ): Observable<{ message: string; soal: Soal }> {
    return from(
      this.soalModelRepository.findOneBy({ id: createDto.model }),
    ).pipe(
      switchMap((soalModel: SoalModel) => {
        const newSoal = this.soalRepository.create({
          ...createDto,
          subject: user.subject,
          author: user,
          model: soalModel,
          noModel: soalModel.noModel,
        });

        return from(this.soalRepository.save(newSoal)).pipe(
          map((soal: Soal) => {
            return {
              message: 'Berhasil membuat soal',
              soal,
            };
          }),
        );
      }),
    );
  }

  editSoal(updateSoalDto: UpdateSoal): Observable<{ message: string }> {
    return from(
      this.soalRepository.update(updateSoalDto.id, updateSoalDto),
    ).pipe(
      map(() => {
        return {
          message: 'Berhasil mengupdate',
        };
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  deleteSoalById(id: string): Observable<{ message: string }> {
    return from(this.soalRepository.delete(id)).pipe(
      map(() => {
        return {
          message: 'Berhasil menghapus',
        };
      }),
      catchError((err) => {
        throw new BadRequestException('Somethnig wrong happened');
      }),
    );
  }
}
