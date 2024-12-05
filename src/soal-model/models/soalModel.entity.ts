import { TutorEntity } from 'src/auth/models/tutor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soal-model')
export class SoalModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  namaModel: string;

  @Column({ type: 'int', unique: true })
  noModel: number;

  @ManyToOne(() => TutorEntity, (tutorEntity) => tutorEntity.model)
  author: TutorEntity;
}
