import { IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto {
  id?: string;
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string;
}
