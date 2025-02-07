import { Injectable } from '@nestjs/common';
import { RecieptRequestDto } from './dto/receiptRequest.dto';

@Injectable()
export class ReceiptsService {
  create(createReceiptDto: RecieptRequestDto) {
    return createReceiptDto;
  }

  findAll() {
    return `This action returns all receipts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  // update(id: number, updateReceiptDto: UpdateReceiptDto) {
  //   return `This action updates a #${id} receipt`;
  // }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
