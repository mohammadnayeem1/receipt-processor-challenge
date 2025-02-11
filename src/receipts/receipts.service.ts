import { Injectable, NotFoundException } from '@nestjs/common';
import { RecieptRequestDto } from './dto/receiptRequest.dto';
import { v4 as uuidv4 } from 'uuid';
import { PointsResponseDto } from './dto/pointsResonse.dto';
import { ReceiptResponseDto } from './dto/receiptResponse.dto';
import { PointsHelper } from './helpers/PointsHelper';

@Injectable()
export class ReceiptsService {
 constructor(private readonly pointsHelper: PointsHelper){}

  private inMemoryDb = new Map<string,number>()

  create(createReceiptDto: RecieptRequestDto) : ReceiptResponseDto {
    const id = uuidv4();
    const points = this.pointsHelper.pointsHelper(createReceiptDto);
    this.inMemoryDb.set(id,points);
    console.log(`Receipt Created: ID=${id}, Points=${points}`)
    return { id };
  }

  
  findAll(): Record<string, number> {
    return Object.fromEntries(this.inMemoryDb);
}


  findOne(id: string) : PointsResponseDto {
    const points = this.inMemoryDb.get(id)
    // if reciept not found throws error
    if (!points){
      throw new NotFoundException("No receipt found for that ID.");
    }
    return { points };
  }
}
