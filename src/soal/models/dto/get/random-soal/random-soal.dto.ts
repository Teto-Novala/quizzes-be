import { IsNotEmpty } from 'class-validator';

export class GetRandomDto {
  @IsNotEmpty({ message: 'Subject tidak boleh kosong' })
  subject: string;
}
