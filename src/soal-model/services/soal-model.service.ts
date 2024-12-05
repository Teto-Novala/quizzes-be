import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoalModelEntity } from '../models/soalModel.entity';
import { Repository } from 'typeorm';
import { CreateSoalModel } from '../models/dto/create/create-soal-model.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { SoalModel } from '../models/dto/soalModel.dto';
import { User } from 'src/auth/models/dto/user.dto';

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
}
