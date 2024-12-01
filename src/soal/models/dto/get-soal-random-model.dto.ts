import { IsNotEmpty } from 'class-validator';

export class GetSoalRandomModel {
  @IsNotEmpty({ message: 'Tidak boleh kosong' })
  subject?: string;
}
