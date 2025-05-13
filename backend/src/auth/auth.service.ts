import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if the user with this email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const role = dto.role || 'USER'; // Default to 'USER' if no role is provided
    const allowedRoles = ['USER', 'ADMIN']; // Define allowed roles (you can expand this as needed)
    if (!allowedRoles.includes(role)) {
      throw new BadRequestException(`Invalid role provided: ${role}`);
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
  }

  // Login method
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.signToken(user.id, user.role);
  }

  private signToken(userId: string, role: string) {
    const payload = { sub: userId, role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
