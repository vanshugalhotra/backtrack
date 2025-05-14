import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client'; // Import Role enum from Prisma

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); // Use Role enum directly
