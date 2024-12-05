import { Jawaban } from '../enums/jawaban.enum';

export class Soal {
  id?: string;

  no?: number;

  soal?: string;

  pilihanA?: string;

  pilihanB?: string;

  pilihanC?: string;

  pilihanD?: string;

  jawaban?: Jawaban;
}
