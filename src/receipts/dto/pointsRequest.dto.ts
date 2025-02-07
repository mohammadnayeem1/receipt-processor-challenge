import { IsString, Matches } from 'class-validator';

export class PointsRequestDto {
  @IsString()
  @Matches(/^\\S+$/, {
    message: 'invalid points request format',
  })
  id: string;
}
