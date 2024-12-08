import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subject')
export class SubjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama: string;
}
