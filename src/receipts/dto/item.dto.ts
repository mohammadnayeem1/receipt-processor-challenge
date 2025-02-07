import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class ItemDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Matches(/^[\w\s\-]+$/, {
    message: 'invalid item description format',
  })
  shortDescription: string;

  @IsString()
  @Matches(/^\d+\.\d{2}$/, {
    message: 'invalid price format valid example: 4.54',
  })
  price: string;
}
