import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUser } from '../models/dto/create-user.dto';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: CreateUser): Observable<CreateUser> {
    return this.authService.registerUser(user);
  }
}
