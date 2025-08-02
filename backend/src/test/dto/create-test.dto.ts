import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateTestDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsBoolean()
  hasStarted?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  problems?: string[];
}
