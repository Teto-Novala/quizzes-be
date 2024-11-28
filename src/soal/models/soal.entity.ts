import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { ModelSoal } from './enums/model.enum';
import { Jawaban } from './enums/jawaban.enum';

@Entity('soal')
export class SoalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ModelSoal, default: ModelSoal.SATU })
  model: ModelSoal;

  @Generated('increment')
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
}
