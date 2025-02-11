import { ItemDto } from "../dto/item.dto";
import { RecieptRequestDto } from "../dto/receiptRequest.dto";

//helper to generate points
export class PointsHelper{
  private logEnabled = true;

  pointsHelper(receipt: RecieptRequestDto) : number {
    var points = 0;
    points += this.alphaNumericPoints(receipt);
    points += this.totalRoundDollarRule(receipt);
    points += this.totalMultipleQuarterRule(receipt);
    points += this.everyTwoItemRule(receipt);
    points += this.trimmedLengthRule(receipt);
    points += this.oddPurchaseDateRule(receipt);
    points += this.purchaseTimeRule(receipt);

    return points
  }

  //One point for every alphanumeric character in the retailer name.
  alphaNumericPoints(receipt: RecieptRequestDto){
    var currPoints = 0
    const retailName : string = receipt.retailer;
    for (const letter of retailName){
      if (/[a-zA-Z0-9]/.test(letter)) {
        currPoints += 1;
      }
    }
    this.logEnabled && console.log(`points for alphanumeric rule: ${currPoints}`);
    return currPoints
  }

  //50 points if the total is a round dollar amount with no cents.
  totalRoundDollarRule(receipt: RecieptRequestDto){
    var currPoints = 0
    const total : number = parseFloat(receipt.total);
    if (total % 1 === 0){
      currPoints += 50
    }
    this.logEnabled && console.log(`points for totalRoundDollarRule rule: ${currPoints}`);
    return currPoints
  }

  //25 points if the total is a multiple of 0.25.
  totalMultipleQuarterRule(receipt: RecieptRequestDto){
    var currPoints = 0
    const total : number = parseFloat(receipt.total);
    if (total % 0.25 === 0){
      currPoints += 25
    }
    this.logEnabled && console.log(`points for totalMultipleQuarterRule rule: ${currPoints}`);
    return currPoints
  }

  //5 points for every two items on the receipt.
  everyTwoItemRule(receipt: RecieptRequestDto){
    var currPoints = 0
    const items : Array<ItemDto> = receipt.items;
    currPoints += Math.floor(items.length/2)*5
    this.logEnabled && console.log(`points for everyTwoItemRule rule: ${currPoints}`);
    return currPoints
  }

  //If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  trimmedLengthRule(receipt: RecieptRequestDto){
  var currPoints = 0
  const items : Array<ItemDto> = receipt.items;
    for (const item of items){
    const itemLength = item.shortDescription.trim().length
      if (itemLength % 3 === 0) {
        currPoints += Math.ceil(parseFloat(item.price) * 0.2);
        }
    }
    this.logEnabled && console.log(`points for trimmedLengthRule rule: ${currPoints}`);
    return currPoints
  }

  //6 points if the day in the purchase date is odd.
  oddPurchaseDateRule(receipt: RecieptRequestDto){
    var currPoints = 0
    const date : string = receipt.purchaseDate
    const [year, month, day] = date.split("-")
    if (Number(day) % 2 == 1){
      currPoints += 6
    }
    this.logEnabled && console.log(`points for oddPurchaseDateRule rule: ${currPoints}`);
    return currPoints
  }
  
  //10 points if the time of purchase is after 2:00pm and before 4:00pm.
  purchaseTimeRule(receipt: RecieptRequestDto){
    var currPoints = 0
    const [hours,minutes] = receipt.purchaseTime.split(":");
    if (Number(hours) === 14 && Number(minutes) > 0) {
        currPoints += 10; 
      } 
    else if (Number(hours) === 15) {
        currPoints += 10;
      }
    this.logEnabled && console.log(`points for purchaseTimeRule rule: ${currPoints}`);
    return currPoints
  }
}

