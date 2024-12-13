import { TutorEntity } from 'src/auth/models/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('jawaban')
export class JawabanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TutorEntity, (tutorEntity) => tutorEntity.jawaban)
  author: TutorEntity;

  @Column()
  benar: number;

  @Column()
  salah: number;

  @Column({ type: 'int' })
  nilai: number;

  @Column()
  subject: string;

  @Column()
  noModel: number;

  @Column()
  namaUser: string;

  @CreateDateColumn()
  createdAt: Date;
}
