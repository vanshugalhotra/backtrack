import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
  Version,
  UseGuards,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { Problem } from '@prisma/client';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { RolesGuard } from 'src/auth/gaurd/roles.gaurd';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.gaurd';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('problems')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get() // GET /v1/problems
  @Roles('USER', 'ADMIN')
  @Version('1')
  async getAllProblems(): Promise<Problem[]> {
    return this.problemService.getAllProblems();
  }

  @Post() // POST /v1/problems
  @Roles('ADMIN')
  @Version('1')
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get(':slug') // GET /v1/problems/:slug
  @Roles('USER', 'ADMIN')
  @Version('1')
  findOne(@Param('slug') slug: string) {
    return this.problemService.findBySlug(slug);
  }

  @Delete(':slug') // DELETE /v1/problems/:slug
  @Roles('ADMIN')
  @Version('1')
  deleteProblem(@Param('slug') slug: string) {
    return this.problemService.deleteProblemBySlug(slug);
  }

  @Put(':slug') // PUT /v1/problems/:slug
  @Roles('ADMIN')
  @Version('1')
  updateProblem(
    @Param('slug') slug: string,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    return this.problemService.updateProblemBySlug(slug, updateProblemDto);
  }
}
