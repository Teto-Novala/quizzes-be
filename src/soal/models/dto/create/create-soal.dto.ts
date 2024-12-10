import { Jawaban } from '../../enums/jawaban.enum';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/models/dto/user.dto';
import { SoalModel } from 'src/soal-model/models/dto/soalModel.dto';

export class CreateSoal {
  subject?: string;

  @IsNotEmpty({ message: 'Soal tidak boleh kosong' })
  soal: string;

  @IsNotEmpty({ message: 'Pilihan A tidak boleh kosong' })
  pilihanA: string;

  @IsNotEmpty({ message: 'Pilihan B tidak boleh kosong' })
  pilihanB: string;

  @IsNotEmpty({ message: 'Pilihan C tidak boleh kosong' })
  pilihanC: string;

  @IsNotEmpty({ message: 'Pilihan D tidak boleh kosong' })
  pilihanD: string;

  @IsNotEmpty({ message: 'Jawaban tidak boleh kosong' })
  jawaban: Jawaban;

  author?: User;

  model?: string;

  noModel?: number;
}
