import { Jawaban } from '../enums/jawaban.enum';
import { ModelSoal } from '../enums/model.enum';

export class Soal {
  id?: string;

  model?: ModelSoal;

  no?: number;

  soal?: string;

  pilihanA?: string;

  pilihanB?: string;

  pilihanC?: string;

  pilihanD?: string;

  jawaban?: Jawaban;
}
