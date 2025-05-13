import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestError,
  PermissionDeniedError,
  InternalServerError,
  HttpError,
} from '../common/errors/http-error';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new BadRequestError('Email is already registered', {
          field: 'email',
        });
      }

      const allowedRoles = ['USER', 'ADMIN'];
      const role = dto.role || 'USER';

      if (!allowedRoles.includes(role)) {
        throw new BadRequestError(`Invalid role provided: ${role}`, {
          allowedRoles,
        });
      }

      const hash = await bcrypt.hash(dto.password, 10);

      const created = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          role,
        },
      });

      return this.signToken(created.id, created.role);
    } catch (error: unknown) {
      if (error instanceof HttpError) throw error;

      const err = error as Error; // Type narrowing for safe access

      throw new InternalServerError('Failed to register user', {
        originalError: err.message,
      });
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new BadRequestError('Invalid credentials', {
          field: 'email',
        });
      }

      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (!isPasswordValid) {
        throw new PermissionDeniedError('Invalid credentials');
      }

      return this.signToken(user.id, user.role);
    } catch (error: unknown) {
      if (error instanceof HttpError) throw error;

      const err = error as Error;

      throw new InternalServerError('Login process failed', {
        originalError: err.message,
      });
    }
  }

  private signToken(userId: string, role: string) {
    const payload = { sub: userId, role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
