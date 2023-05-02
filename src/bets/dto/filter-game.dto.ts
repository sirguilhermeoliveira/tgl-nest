import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FilterGameParams {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  gameId: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;
}
