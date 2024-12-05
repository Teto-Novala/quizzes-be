import { IsNotEmpty } from 'class-validator';

export class UpdateSoalModel {
  @IsNotEmpty({ message: 'Id tidak boleh kosong' })
  id: string;
  @IsNotEmpty({ message: 'Nama model tidak boleh kosong' })
  namaModel: string;
}
