import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUser } from '../models/dto/create-user.dto';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../models/dto/login-user.dto';
import { User } from '../models/dto/user.dto';

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
}
