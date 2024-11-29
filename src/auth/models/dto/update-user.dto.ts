import { IsNotEmpty } from 'class-validator';

export class UpdateUser {
  id?: string;
  username?: string;
  email?: string;
}
