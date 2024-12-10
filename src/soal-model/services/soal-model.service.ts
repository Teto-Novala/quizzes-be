import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalModelEntity } from '../models/soalModel.entity';
import { Repository } from 'typeorm';
import { CreateSoalModel } from '../models/dto/create/create-soal-model.dto';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { SoalModel } from '../models/dto/soalModel.dto';
import { User } from 'src/auth/models/dto/user.dto';
import { UpdateSoalModel } from '../models/dto/update/update-soal-model.dto';

@Injectable()
export class SoalModelService {
  constructor(
    @InjectRepository(SoalModelEntity)
    private readonly soalModelRepository: Repository<SoalModelEntity>,
  ) {}

  createModel(
    user: User,
    createDto: CreateSoalModel,
  ): Observable<{ message: string }> {
    return from(
      this.soalModelRepository.find({ order: { noModel: 'DESC' }, take: 1 }),
    ).pipe(
      switchMap((lastEntries: SoalModel[]) => {
        const lastEntry = lastEntries[0];

        const newNoModel = lastEntry ? lastEntry.noModel + 1 : 1;

        const newSoalModel = this.soalModelRepository.create({
          namaModel: createDto.namaModel,
          noModel: newNoModel,
          author: user,
        });

        return from(this.soalModelRepository.save(newSoalModel)).pipe(
          map(() => {
            return {
              message: 'Berhasil Membuat Model',
            };
          }),
        );
      }),
    );
  }

  reOrderNoModel(): Observable<void> {
    return from(
      this.soalModelRepository.find({
        order: { noModel: 'ASC' },
      }),
    ).pipe(
      switchMap((AllEntries: SoalModel[]) => {
        const updateObservable = AllEntries.map((entry, index) => {
          entry.noModel = index + 1;
          return from(this.soalModelRepository.save(entry));
        });

        return of(undefined);
      }),
    );
  }

  deleteModel(id: string): Observable<{ message: string }> {
    return from(this.soalModelRepository.delete(id)).pipe(
      switchMap(() => this.reOrderNoModel()),
      map(() => {
        return {
          message: 'Berhasil Menghapus',
        };
      }),
      catchError((err) => {
        throw new InternalServerErrorException();
      }),
    );
  }

  updateModel(updateDto: UpdateSoalModel): Observable<{ message: string }> {
    return from(this.soalModelRepository.findOneBy({ id: updateDto.id })).pipe(
      switchMap((soalModel: SoalModel) => {
        if (!soalModel) {
          throw new NotFoundException('Model tidak ditemukan');
        }

        return from(
          this.soalModelRepository.update(updateDto.id, {
            namaModel: updateDto.namaModel,
          }),
        ).pipe(
          map(() => {
            return {
              message: 'Berhasil Mengupdate',
            };
          }),
        );
      }),
      catchError((err) => {
        throw new InternalServerErrorException();
      }),
    );
  }

  getAllModelById(id: string): Observable<SoalModel[]> {
    return from(
      this.soalModelRepository.find({
        where: { author: { id: id } },
        order: { namaModel: 'ASC' },
      }),
    ).pipe(
      map((soalModel: SoalModel[]) => {
        return soalModel;
      }),
      catchError((err) => {
        throw new BadRequestException('Something went wrong');
      }),
    );
  }

  getModelById(id: string): Observable<SoalModel> {
    return from(this.soalModelRepository.findOneBy({ id })).pipe(
      map((soalModel: SoalModel) => {
        return soalModel;
      }),
      catchError((err) => {
        throw new BadRequestException('Something went wrong');
      }),
    );
  }
}
