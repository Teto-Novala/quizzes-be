import { Soal } from 'src/soal/models/dto/soal.dto';
import { Role } from '../enums/role.enum';
import { SubjectEnum } from '../enums/subject.enum';

export class User {
  id?: string;

  username?: string;

  email?: string;

  subject?: SubjectEnum;
  password?: string;
  role?: Role;
  soal?: Soal[];
}
