import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { SubjectEnum } from '../enums/subject.enum';

export class CreateUser {
  id?: string;

  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Bukan Format Email' })
  email: string;

  @IsNotEmpty({ message: 'Passwor tidak boleh kosong' })
  password: string;

  subject?: SubjectEnum;

  role?: Role;
}
