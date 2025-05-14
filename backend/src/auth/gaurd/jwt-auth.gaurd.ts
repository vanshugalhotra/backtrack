import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); // Type the request object
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return false; // No token found
    }

    const token = authorizationHeader.split(' ')[1]; // Extract 'Bearer <token>'

    try {
      const user: JwtPayload = this.jwtService.verify(token);

      request.user = user;

      return true; // If valid, allow request to proceed
    } catch {
      return false; // Invalid token, deny access
    }
  }
}
