import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class PaginationParams {
  @IsOptional()
  @Transform(({ value }) => uuidv4(value))
  gameId: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;
}
