import {
  Controller,
  Delete,
  UseGuards,
  ForbiddenException,
  Version,
} from '@nestjs/common';
import { ClearDbService } from './clear-db.service';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.gaurd';
import { RolesGuard } from 'src/auth/gaurd/roles.gaurd';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('clear-db')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClearDbController {
  constructor(private readonly clearDbService: ClearDbService) {}

  @Delete('users')
  @Roles('ADMIN')
  @Version('1')
  async clearUsers() {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'This operation is not allowed in production.',
      );
    }

    await this.clearDbService.clearUsers();
    return { message: 'All users have been deleted successfully.' };
  }

  @Delete('problems')
  @Roles('ADMIN')
  @Version('1')
  async clearProblems() {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'This operation is not allowed in production.',
      );
    }

    await this.clearDbService.clearProblems();
    return { message: 'All problems have been deleted successfully.' };
  }

  @Delete('all')
  @Roles('ADMIN')
  @Version('1')
  async clearAll() {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'This operation is not allowed in production.',
      );
    }

    await this.clearDbService.clearAll();
    return { message: 'All records have been deleted successfully.' };
  }
}
