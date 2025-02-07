import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { RecieptRequestDto } from './dto/receiptRequest.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  //takes in receipts and processes it 
  @Post('process')
  create(@Body() createReceiptDto: RecieptRequestDto) {
    return this.receiptsService.create(createReceiptDto);
  }


  //gets points for specific receipt id
  @Get(':id/points')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(id);
  }

  //gets all id's and points for testing purposes
  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

}
