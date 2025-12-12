import { IsOptional } from 'class-validator';

export class FindMessageDto {
  @IsOptional()
  public page?: number;

  @IsOptional()
  public limit?: number;
}
