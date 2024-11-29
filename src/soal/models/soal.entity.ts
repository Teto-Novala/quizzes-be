import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelSoal } from './enums/model.enum';
import { Jawaban } from './enums/jawaban.enum';
import { TutorEntity } from 'src/auth/models/tutor.entity';

@Entity('soal')
export class SoalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ModelSoal, default: ModelSoal.SATU })
  model: ModelSoal;

  @Column()
  subject: string;

  @Column({ type: 'int4', generated: 'increment' })
  no: number;

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
}
