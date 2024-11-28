import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { from, map, Observable, switchMap } from 'rxjs';
import { CreateUser } from '../models/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerUser(user: CreateUser): Observable<CreateUser> {
    const { username, email, password } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashPw: string) => {
        return from(
          this.userRepository.save({
            username,
            email,
            password: hashPw,
          }),
        ).pipe(
          map((user: CreateUser) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }
}
