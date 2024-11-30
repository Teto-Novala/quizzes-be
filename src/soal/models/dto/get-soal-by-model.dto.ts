import { User } from 'src/auth/models/dto/user.dto';
import { ModelSoal } from '../enums/model.enum';
import { IsNotEmpty } from 'class-validator';

export class GetSoalByModel {
  @IsNotEmpty({ message: 'Author tidak boleh kosong' })
  author: string;

  @IsNotEmpty({ message: 'Model tidak boleh kosong' })
  model: ModelSoal;
}
