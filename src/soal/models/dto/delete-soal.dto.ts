import { IsNotEmpty } from 'class-validator';

export class DeleteSoal {
  @IsNotEmpty({ message: 'Id tidak boleh kosong' })
  id?: string;
}
