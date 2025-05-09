import { IsString } from 'class-validator';

export class ExecuteDto {
  @IsString()
  exePath!: string;

  @IsString()
  input!: string;
}
