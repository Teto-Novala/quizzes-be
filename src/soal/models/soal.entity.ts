import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Jawaban } from './enums/jawaban.enum';
import { TutorEntity } from 'src/auth/models/tutor.entity';
import { SoalModelEntity } from 'src/soal-model/models/soalModel.entity';

@Entity('soal')
export class SoalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column()
  soal: string;

  @Column()
  pilihanA: string;

  @Column()
  pilihanB: string;

  @Column()
  pilihanC: string;

  @Column()
  pilihanD: string;

  @Column({ type: 'enum', enum: Jawaban })
  jawaban: Jawaban;

  @ManyToOne(() => TutorEntity, (tutorEntity) => tutorEntity.soal)
  author: TutorEntity;

  @ManyToOne(() => SoalModelEntity, (soalModelEntity) => soalModelEntity.soal)
  model: SoalModelEntity;

  @Column({ type: 'int' })
  noModel: number;
}
