import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUser } from '../models/dto/create-user.dto';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../models/dto/login-user.dto';
import { User } from '../models/dto/user.dto';
import { UpdateUser } from '../models/dto/update-user.dto';
import { KonfirmasiPw } from '../models/dto/konfirmasi-pw.dto';
import { DeleteUser } from '../models/dto/delete-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { UpdateRoleSubjectUserDto } from '../models/dto/update-role-subject.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: CreateUser): Observable<CreateUser> {
    return this.authService.registerUser(user);
  }

  @Post('login')
  loginUser(
    @Body() user: LoginUser,
  ): Observable<{ token: string; user: User }> {
    return this.authService.loginUser(user);
  }

  @Put('update')
  updateUser(@Body() user: UpdateUser): Observable<{ message: string }> {
    return this.authService.updateUser(user);
  }

  @Delete('delete')
  deleteUser(@Body() user: DeleteUser): Observable<{ message: string }> {
    return this.authService.deleteUser(user);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllUser(): Observable<User[]> {
    return this.authService.getAllUser();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Observable<User> {
    return this.authService.getUserById(id);
  }

  @UseGuards(JwtGuard)
  @Put('update/role')
  updateRoleSubjectUser(
    @Body() updateDto: UpdateRoleSubjectUserDto,
  ): Observable<{ message: string }> {
    return this.authService.editUserRoleSubject(updateDto, updateDto.id);
  }
}
