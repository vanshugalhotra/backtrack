import {
  Controller,
  Post,
  Body,
  Version,
  UseGuards,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.gaurd';
import { RolesGuard } from 'src/auth/gaurd/roles.gaurd';
import { Test } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionDeniedError } from 'src/common/errors/http-error';

@Controller('tests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @Roles('ADMIN')
  @Version('1')
  createTest(@Body() dto: CreateTestDto) {
    return this.testService.createTest(dto);
  }

  @Get()
  @Roles('USER', 'ADMIN')
  @Version('1')
  async getAllTests(): Promise<Test[]> {
    return this.testService.getAllTests();
  }

  @Get(':slug')
  @Roles('USER', 'ADMIN')
  @Version('1')
  async getTestBySlug(
    @Param('slug') slug: string,
    @Query('password') password: string,
  ): Promise<Test> {
    const test = await this.testService.getTestBySlug(slug);

    if (test.password && test.password !== password) {
      throw new PermissionDeniedError('Incorrect password');
    }

    return test;
  }

  @Post(':slug/start')
  @Roles('ADMIN')
  @Version('1')
  async startTest(
    @Param('slug') slug: string,
    @Body('password') password: string,
  ): Promise<{ message: string }> {
    await this.testService.startTest(slug, password);
    return { message: 'Test started successfully' };
  }

  @Delete(':slug')
  @Roles('ADMIN')
  @Version('1')
  async deleteTest(@Param('slug') slug: string) {
    return this.testService.deleteTest(slug);
  }
}
