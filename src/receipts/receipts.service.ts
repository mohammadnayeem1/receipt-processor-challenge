import { Injectable } from '@nestjs/common';
import { RecieptRequestDto } from './dto/receiptRequest.dto';
import { v4 as uuidv4 } from 'uuid';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ReceiptsService {

  private inMemoryDb = new Map<string,number>()

  create(createReceiptDto: RecieptRequestDto) {
    const id = uuidv4();
    const points = this.pointsHelper(createReceiptDto);
    this.inMemoryDb.set(id,points);
    console.log(points)
    return { id };
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

  pointsHelper(receipt: RecieptRequestDto) : number {
    var points : number = 0;
    const retailName : string = receipt.retailer;

    //One point for every alphanumeric character in the retailer name.
    for (const letter of retailName){
      if (/[a-zA-Z0-9]/.test(letter)) {
        points += 1;
      }
    }

    //50 points if the total is a round dollar amount with no cents.
    const total : number = parseFloat(receipt.total);
    
    if (total % 1 === 0){
      points += 50
    }

    //25 points if the total is a multiple of 0.25.
    if (total % 0.25 === 0){
      points += 25
    }

    const items : Array<ItemDto> = receipt.items;

    //5 points for every two items on the receipt.
    points += Math.floor(items.length/2)*5

    //If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.

    for (const item of items){
      const itemLength = item.shortDescription.trim().length
      if (itemLength % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
          }
    }


    //6 points if the day in the purchase date is odd.
    const date = receipt.purchaseDate
    const [year, month, day] = date.split("-")
    if (Number(day) % 2 == 1){
      points += 6
    }

    //10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const [hours,minutes] = receipt.purchaseTime.split(":")
    if (Number(hours) === 14 && Number(minutes) > 0) {
      points += 10; 
    } else if (Number(hours) === 15) {
      points += 10;
    }

    return points

  }
}
