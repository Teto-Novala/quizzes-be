import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Bukan format Email' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  password: string;
}
