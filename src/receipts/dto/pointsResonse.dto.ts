import { IsInt } from 'class-validator';

export class PointsResponseDto {
  @IsInt()
  points: number;
}
