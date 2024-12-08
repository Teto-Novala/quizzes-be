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
import { Not, Repository } from 'typeorm';
import { LoginUser } from '../models/dto/login-user.dto';
import { User } from '../models/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUser } from '../models/dto/update-user.dto';
import { emit } from 'process';
import { DeleteUser } from '../models/dto/delete-user.dto';
import { TutorEntity } from '../models/tutor.entity';
import { Role } from '../models/enums/role.enum';
import { UpdateRoleSubjectUserDto } from '../models/dto/update-role-subject.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TutorEntity)
    private readonly userRepository: Repository<TutorEntity>,
    private JwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerUser(user: CreateUser): Observable<CreateUser> {
    const { username, email, password, subject = '' } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashPw: string) => {
        return from(
          this.userRepository.save({
            username,
            email,
            password: hashPw,
            subject,
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
        select: ['id', 'username', 'email', 'password', 'role', 'subject'],
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
    return from(
      this.userRepository.findOne({
        where: { id },
        select: [
          'id',
          'email',
          'model',
          'password',
          'role',
          'soal',
          'subject',
          'username',
        ],
      }),
    ).pipe(
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

  // updateUser(
  //   user: UpdateUser,
  //   id: string,
  // ): Observable<{ message: string; user: User }> {
  //   return from(this.findUserById(user.id)).pipe(
  //     switchMap((existUser: User) => {
  //       from(bcrypt.compare(user.password, existUser.password)).pipe(
  //         map((isValid: boolean) => {
  //           if (isValid) {
  //             const payload = { ...existUser, ...user };
  //             return from(this.userRepository.update(id, payload)).pipe(
  //               map(() => {
  //                 return {
  //                   message: 'Berhasil Update',
  //                   user: payload,
  //                 };
  //               }),
  //               catchError((err) => {
  //                 throw new BadRequestException('Something Wrong Happened');
  //               }),
  //             );
  //           } else {
  //             throw new BadRequestException('Invalid password');
  //           }
  //         }),
  //       );
  //     }),
  //     catchError((err) => {
  //       throw new BadRequestException('Something Wrong Happened');
  //     }),
  //   );
  // }

  updateUser(user: UpdateUser): Observable<{ message: string; user: User }> {
    return from(this.findUserById(user.id)).pipe(
      switchMap((existUser: User) => {
        return from(bcrypt.compare(user.password, existUser.password)).pipe(
          switchMap((isValid: boolean) => {
            if (isValid) {
              const payload = { ...existUser, ...user };
              return from(this.hashPassword(payload.password)).pipe(
                switchMap((hashPw: string) => {
                  payload.password = hashPw;
                  return from(
                    this.userRepository.update(user.id, payload),
                  ).pipe(
                    map(() => {
                      delete payload.password;
                      return {
                        message: 'Berhasil Update',
                        user: payload,
                      };
                    }),
                  );
                }),
              );
            } else {
              throw new BadRequestException('Password salah');
            }
          }),
          // catchError((err) => {
          //   throw new BadRequestException('Password salah');
          // }),
        );
      }),
      // catchError((err) => {
      //   throw new BadRequestException('Something went wrong');
      // }),
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

  getAllUser(): Observable<User[]> {
    return from(
      this.userRepository.find({ where: { role: Not(Role.ADMIN) } }),
    ).pipe(
      map((user: User[]) => {
        return user;
      }),
      catchError((err) => {
        throw new BadRequestException('Something wrong happened');
      }),
    );
  }

  getUserById(id: string): Observable<User> {
    return from(this.userRepository.findOneBy({ id })).pipe(
      map((user: User) => {
        return user;
      }),
      catchError((err) => {
        throw new BadRequestException('Something went wrong');
      }),
    );
  }

  editUserRoleSubject(
    updateDto: UpdateRoleSubjectUserDto,
    id: string,
  ): Observable<{ message: string }> {
    return from(this.userRepository.update(id, updateDto)).pipe(
      map(() => {
        return {
          message: 'Berhasil Update',
        };
      }),
      catchError((err) => {
        throw new BadRequestException('Something went wrong');
      }),
    );
  }
}
