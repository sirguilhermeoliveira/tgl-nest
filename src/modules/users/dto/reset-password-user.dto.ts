import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'guilherme@gmail.com',
    description: `Person email, has to be unique for each user and a string.`,
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'guilherme@gmail.com',
    description: `Person email, has to be unique for each user and a string.`,
  })
  code: string;

  @ApiProperty({
    example: '123@Abc',
    description: `Has to have a uppercase and a lower case letter, min length 4, max length 20 and a number. Has to be a string.`,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;
}
