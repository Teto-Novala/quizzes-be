import { SoalModelEntity } from 'src/soal-model/models/soalModel.entity';
import { Jawaban } from '../enums/jawaban.enum';
import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';

export class Soal {
  id?: string;

  soal?: string;

  pilihanA?: string;

  pilihanB?: string;

  pilihanC?: string;

  pilihanD?: string;

  jawaban?: Jawaban;

  model?: SoalModel;
}
