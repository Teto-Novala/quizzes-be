import { IsNotEmpty } from 'class-validator';
import { Jawaban } from '../enums/jawaban.enum';
import { ModelSoal } from '../enums/model.enum';

export class UpdateSoal {
  @IsNotEmpty({ message: 'Id tidak boleh kosong' })
  id?: string;

  @IsNotEmpty({ message: 'Model tidak boleh kosong' })
  model?: ModelSoal;

  @IsNotEmpty({ message: 'Subject tidak boleh kosong' })
  subject?: string;

  @IsNotEmpty({ message: 'Soal tidak boleh kosong' })
  soal?: string;

  @IsNotEmpty({ message: 'Pilihan A tidak boleh kosong' })
  pilihanA?: string;

  @IsNotEmpty({ message: 'Pilihan B tidak boleh kosong' })
  pilihanB?: string;

  @IsNotEmpty({ message: 'Pilihan C tidak boleh kosong' })
  pilihanC?: string;

  @IsNotEmpty({ message: 'Pilihan D tidak boleh kosong' })
  pilihanD?: string;

  @IsNotEmpty({ message: 'Jawaban tidak boleh kosong' })
  jawaban?: Jawaban;
}
