import { IsNotEmpty } from 'class-validator';

export class KonfirmasiPw {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
