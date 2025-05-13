import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role!: Role;
}
