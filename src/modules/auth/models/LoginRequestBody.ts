import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class LoginRequestBody {
  @IsUUID()
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
