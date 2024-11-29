import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';
import { SubjectEnum } from './enums/subject.enum';
import { SoalEntity } from 'src/soal/models/soal.entity';

@Entity('tutor')
export class TutorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: SubjectEnum, default: SubjectEnum.MTK })
  subject: SubjectEnum;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
  @OneToMany(() => SoalEntity, (soalEntity) => soalEntity.author)
  soal: SoalEntity[];
}
