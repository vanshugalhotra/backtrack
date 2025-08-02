import { Controller, Post, Body, Version, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.gaurd';
import { RolesGuard } from 'src/auth/gaurd/roles.gaurd';
import { Roles } from 'src/auth/decorators/roles.decorator';

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
}
