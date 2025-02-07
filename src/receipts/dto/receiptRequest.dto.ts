import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsISO8601,
  Matches,
  ArrayMinSize,
} from 'class-validator';

export class RecieptRequestDto {
  @IsString()
  @Matches(/^[\w\s\-&]+$/, {
    message: 'The receipt is invalid: invalid retailer name',
  })
  retailer: string;

  @IsISO8601({ strict: true })
  purchaseDate: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'The receipt is invalid: purchaseTime format must be in HH:mm format',
  })
  purchaseTime: string;

  @IsArray()
  @ArrayMinSize(1, {
    message: 'The receipt is invalid: items must contain atleast one items',
  })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsString()
  @Matches(/^\d+\.\d{2}$/, {
    message: 'The receipt is invalid: total format invalid -valid example: 44.44',
  })
  total: string;
}
