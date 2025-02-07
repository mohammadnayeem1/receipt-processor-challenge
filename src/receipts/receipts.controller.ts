import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { RecieptRequestDto } from './dto/receiptRequest.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post('process')
  create(@Body() createReceiptDto: RecieptRequestDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
  //   return this.receiptsService.update(+id, updateReceiptDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.remove(+id);
  }
}
