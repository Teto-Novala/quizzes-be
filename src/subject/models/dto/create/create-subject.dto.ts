import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  nama: string;
}
