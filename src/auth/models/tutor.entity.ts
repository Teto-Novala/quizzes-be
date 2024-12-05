import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';
import { SubjectEnum } from './enums/subject.enum';
import { SoalEntity } from 'src/soal/models/soal.entity';
import { SoalModelEntity } from 'src/soal-model/models/soalModel.entity';
import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';

@Entity('user')
export class TutorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: SubjectEnum, default: SubjectEnum.Null })
  subject: SubjectEnum;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => SoalEntity, (soalEntity) => soalEntity.author)
  soal: SoalEntity[];

  @OneToMany(() => SoalModelEntity, (soalModelEntity) => soalModelEntity.author)
  model: SoalModel[];
}
