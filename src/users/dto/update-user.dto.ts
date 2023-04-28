import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { User } from '../entities/user.entity';

export class UpdateUserDto extends User {
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
