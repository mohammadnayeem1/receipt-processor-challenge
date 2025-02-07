import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class ItemDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Matches(/^[\w\s\-]+$/, {
    message: 'The receipt is invalid: item description format invalid',
  })
  shortDescription: string;

  @IsString()
  @Matches(/^\d+\.\d{2}$/, {
    message: 'The receipt is invalid: price format invalid -valid example: 4.54',
  })
  price: string;
}
