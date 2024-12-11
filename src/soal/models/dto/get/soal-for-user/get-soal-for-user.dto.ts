import { IsNotEmpty } from 'class-validator';

export class GetSoalForUser {
  @IsNotEmpty({ message: 'No Model tidak boleh kosong' })
  noModel: number;
  @IsNotEmpty({ message: 'Subject tidak boleh kosong' })
  subject: string;
}
