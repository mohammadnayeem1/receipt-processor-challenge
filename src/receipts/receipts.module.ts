import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { PointsHelper } from './helpers/PointsHelper';

@Module({
  controllers: [ReceiptsController],
  providers: [ReceiptsService, PointsHelper],
})
export class ReceiptsModule {}
