import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  @IsOptional()
  id?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  password: string;
}
