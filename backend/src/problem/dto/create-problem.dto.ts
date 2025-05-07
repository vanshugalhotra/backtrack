import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Difficulty } from '@prisma/client';

export class CreateProblemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsInt()
  @Min(0)
  points: number;

  @IsString()
  @IsNotEmpty()
  exePath: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  iconPath: string;
}
