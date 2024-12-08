import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';
import { Jawaban } from '../../enums/jawaban.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateSoal {
  @IsNotEmpty({ message: 'Id tidak boleh kosong' })
  id: string;

  soal?: string;

  pilihanA?: string;

  pilihanB?: string;

  pilihanC?: string;

  pilihanD?: string;

  jawaban?: Jawaban;

  model?: SoalModel;
}
