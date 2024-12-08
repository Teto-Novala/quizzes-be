import { IsNotEmpty } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateRoleSubjectUserDto {
  @IsNotEmpty({ message: 'Id tidak boleh kosong' })
  id: string;
  @IsNotEmpty({ message: 'Role tidak boleh kosong' })
  role: Role;

  subject?: string;
}
