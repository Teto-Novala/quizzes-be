import { IsNotEmpty } from 'class-validator';
import { TutorEntity } from 'src/auth/models/tutor.entity';
import { ReqJawaban } from './req-jawaban.dto';

export class CreateJawaban {
  //   @IsNotEmpty({ message: 'User tidak boleh kosong' })
  //   user?: TutorEntity;

  //   @IsNotEmpty({ message: 'subject tidak boleh kosong' })
  subject?: string;

  //   @IsNotEmpty({ message: 'Nomor Model tidak boleh kosong' })
  noModel?: number;

  //   @IsNotEmpty({ message: 'Jawaban tidak boleh kosong' })
  jawaban?: ReqJawaban[];
}
