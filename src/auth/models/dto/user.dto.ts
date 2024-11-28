import { Role } from '../enums/role.enum';

export class User {
  id?: string;

  username: string;

  email: string;

  password: string;
  role?: Role;
}
