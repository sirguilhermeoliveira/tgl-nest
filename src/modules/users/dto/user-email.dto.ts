import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserEmailDto {
  @IsEmail()
  @ApiProperty({
    example: 'guilherme@gmail.com',
    description: `Person email, has to be unique for each user and a string.`,
  })
  email: string;
}
