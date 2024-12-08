import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from '../models/subject.entity';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable } from 'rxjs';
import { SubjectDto } from '../models/dto/subject.dto';
import { CreateSubjectDto } from '../models/dto/create/create-subject.dto';
import { UpdateSubjectDto } from '../models/dto/update/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  getAllSubject(): Observable<SubjectDto[]> {
    return from(this.subjectRepository.find()).pipe(
      map((subject: SubjectDto[]) => {
        return subject;
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  getSubjectByid(id: string): Observable<SubjectDto> {
    return from(this.subjectRepository.findOneBy({ id })).pipe(
      map((subject: SubjectDto) => {
        return subject;
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  createSubject(
    createSubjectDto: CreateSubjectDto,
  ): Observable<{ message: string; subject: SubjectDto }> {
    return from(this.subjectRepository.save(createSubjectDto)).pipe(
      map((subject: SubjectDto) => {
        return {
          message: 'Berhasil membuat subject',
          subject,
        };
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  editSubjet(
    updateSubjectDto: UpdateSubjectDto,
  ): Observable<{ message: string }> {
    return from(
      this.subjectRepository.update(updateSubjectDto.id, {
        nama: updateSubjectDto.nama,
      }),
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

  deleteSubject(id: string): Observable<{ message: string }> {
    return from(this.subjectRepository.delete(id)).pipe(
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
}
