import { TutorEntity } from 'src/auth/models/tutor.entity';
import { Soal } from 'src/soal/models/dto/soal.dto';
import { SoalEntity } from 'src/soal/models/soal.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('soal-model')
export class SoalModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  namaModel: string;

  @Column()
  noModel: number;

  @ManyToOne(() => TutorEntity, (tutorEntity) => tutorEntity.model)
  author: TutorEntity;

  @OneToMany(() => SoalEntity, (soalEntity) => soalEntity.model)
  soal: Soal[];

  @Column()
  subject: string;
}
