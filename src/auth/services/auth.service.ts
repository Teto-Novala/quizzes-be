import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { CreateUser } from '../models/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { LoginUser } from '../models/dto/login-user.dto';
import { User } from '../models/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUser } from '../models/dto/update-user.dto';
import { emit } from 'process';
import { DeleteUser } from '../models/dto/delete-user.dto';

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
        } else {
          throw new NotFoundException('Password salah');
        }
      }),
    );
  }

  // updateUser(user: UpdateUser, id: string): Observable<{ message: string }> {
  //   return from(this.userRepository.update(id, user)).pipe(
  //     map(() => {
  //       return {
  //         message: 'Berhasil Update',
  //       };
  //     }),
  //     catchError((err) => {
  //       throw new BadRequestException('Something wrong Happened');
  //     }),
  //   );
  // }

  findUserById(id: string): Observable<User> {
    return from(this.userRepository.findOneBy({ id })).pipe(
      switchMap((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return of(user);
      }),
      catchError((error) => {
        if (error instanceof NotFoundException) {
          throw error; // Re-throw NotFoundException for component handling
        } else {
          console.error('Unexpected error:', error);
          return of(null); // Or throw a generic error as needed
        }
      }),
    );
  }

  updateUser(
    user: UpdateUser,
    id: string,
  ): Observable<{ message: string; user: User }> {
    return from(this.findUserById(user.id)).pipe(
      switchMap((existUser: User) => {
        const payload = { ...existUser, ...user };
        return from(this.userRepository.update(id, payload)).pipe(
          map(() => {
            return {
              message: 'Berhasil Update',
              user: payload,
            };
          }),
          catchError((err) => {
            throw new BadRequestException('Something Wrong Happened');
          }),
        );
      }),
    );
  }

  konfirmasiPassword(
    email: string,
    password: string,
  ): Observable<{ message: boolean }> {
    return from(
      this.userRepository.findOne({
        where: { email },
        select: ['password', 'email', 'username', 'role'],
      }),
    ).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(bcrypt.compare(password, user.password)).pipe(
            map((isValid: boolean) => {
              if (isValid) {
                return {
                  message: true,
                };
              } else {
                throw new BadRequestException('Password salah');
              }
            }),
          );
        } else {
          throw new NotFoundException('Akun tidak ada');
        }
      }),
    );
  }

  deleteUser(user: DeleteUser): Observable<{ message: string }> {
    return from(
      this.userRepository.findOne({
        where: { email: user.email },
        select: ['email', 'password', 'username', 'role', 'id'],
      }),
    ).pipe(
      switchMap((existUser: User) => {
        if (existUser) {
          return from(bcrypt.compare(user.password, existUser.password)).pipe(
            switchMap((isValid) => {
              if (isValid) {
                return from(
                  this.userRepository.delete({ id: existUser.id }),
                ).pipe(map(() => ({ message: 'Berhasil Menghapus akun' })));
              } else {
                throw new BadRequestException('Password salah');
              }
            }),
          );
        } else {
          throw new NotFoundException('Akun tidak ada');
        }
      }),
    );
  }
}
