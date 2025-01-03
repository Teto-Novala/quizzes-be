import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';
import { SoalEntity } from 'src/soal/models/soal.entity';
import { SoalModelEntity } from 'src/soal-model/models/soalModel.entity';
import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';
import { JawabanEntity } from 'src/jawaban/models/jawaban.entity';
import { Jawaban } from 'src/jawaban/models/dto/jawaban.dto';

@Entity('user')
export class TutorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  namaLengkap: string;

  @Column()
  username: string;

  @Column({ unique: true })
  noHp: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column({ select: false })
  password: string;

  @Column()
  subject: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => SoalEntity, (soalEntity) => soalEntity.author)
  soal: SoalEntity[];

  @OneToMany(() => SoalModelEntity, (soalModelEntity) => soalModelEntity.author)
  model: SoalModel[];

  @OneToMany(() => JawabanEntity, (jawabanEntity) => jawabanEntity.author)
  jawaban: Jawaban[];
}
