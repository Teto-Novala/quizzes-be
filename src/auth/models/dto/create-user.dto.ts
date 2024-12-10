import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUser {
  id?: string;

  @IsNotEmpty({ message: 'Nama Lengkap tidak boleh kosong' })
  namaLengkap: string;

  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @IsNotEmpty({ message: 'Nomor HP tidak boleh kosong' })
  noHp: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Bukan Format Email' })
  email: string;

  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address: string;

  @IsNotEmpty({ message: 'Passwor tidak boleh kosong' })
  password: string;

  subject?: string;

  role?: Role;
}
