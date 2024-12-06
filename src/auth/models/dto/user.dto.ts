import { Soal } from 'src/soal/models/dto/soal.dto';
import { Role } from '../enums/role.enum';
import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';

export class User {
  id?: string;

  username?: string;

  email?: string;

  subject?: string;
  password?: string;
  role?: Role;
  soal?: Soal[];
  model?: SoalModel[];
}
