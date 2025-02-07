import { IsString, Matches } from 'class-validator';

export class ReceiptResponseDto {
  @IsString()
  @Matches(/^\\S+$/, {
    message: 'invalid id format no whitespace',
  })
  id: string;
}
