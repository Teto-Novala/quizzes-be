import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { CreateUser } from '../models/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { LoginUser } from '../models/dto/login-user.dto';
import { User } from '../models/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private JwtService: JwtService,
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

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email },
        select: ['id', 'username', 'email', 'password', 'role'],
      }),
    ).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValid: boolean) => {
            if (isValid) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
      catchError((err) =>
        throwError(() => new NotFoundException('Akun tidak ditemukan')),
      ),
    );
  }

  loginUser(user: LoginUser): Observable<{ token: string; user: User }> {
    const { email, password } = user;

    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(this.JwtService.signAsync({ user })).pipe(
            map((token: string) => {
              return {
                token,
                user,
              };
            }),
          );
        }
      }),
      catchError((err) =>
        throwError(() => {
          throw new BadRequestException('Password salah');
        }),
      ),
    );
  }
}
