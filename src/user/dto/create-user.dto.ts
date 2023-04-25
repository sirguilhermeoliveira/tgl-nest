import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  @ApiProperty({
    example: 'guilherme@gmail.com',
    description: `Person email, has to be unique for each user and a string.`,
  })
  email: string;

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
  password: string;

  @ApiProperty({
    example: 'Guilherme Oliveira',
    description: `Person name, has to be a string.`,
  })
  @IsString()
  name: string;
}
