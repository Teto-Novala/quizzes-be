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

  getAllSoalByModel(
    idUser: string,
    idModel: string,
    noModel: number,
  ): Observable<Soal[]> {
    return from(
      this.soalRepository.find({
        where: {
          author: { id: idUser },
          model: { id: idModel },
          noModel: noModel,
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

  createSoal(
    user: User,
    createDto: CreateSoal,
  ): Observable<{ message: string; soal: Soal }> {
    return from(
      this.soalModelRepository.findOneBy({ id: createDto.model.id }),
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
}
