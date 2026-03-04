import {
  Controller,
  Post,
  Body,
  Version,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Version('1')
  register(
    @Body() dto: RegisterDto,
    @Headers('x-admin-secret') secret: string,
  ) {
    if (secret !== process.env.ADMIN_REGISTER_SECRET) {
      throw new ForbiddenException('Registration disabled');
    }
    return this.authService.register(dto);
  }

  @Post('login')
  @Version('1')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
