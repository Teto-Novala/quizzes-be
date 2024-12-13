import { IsNotEmpty } from 'class-validator';

export class CreateSoalModel {
  @IsNotEmpty({ message: 'Nama model tidak boleh kosong' })
  namaModel: string;

  subject?: string;
}
