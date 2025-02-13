import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ReceiptsService } from './receipts.service'; 
import { PointsHelper } from './helpers/PointsHelper';
import { RecieptRequestDto } from './dto/receiptRequest.dto';

describe('ReceiptsService', () => {
  let receiptsService: ReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptsService,
        {
          provide: PointsHelper,
          useValue: {
            pointsHelper: jest.fn().mockReturnValue(28),
          },
        },
      ],
    }).compile();

    receiptsService = module.get<ReceiptsService>(ReceiptsService);
  });

  it('should be defined', () => {
    expect(receiptsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a receipt, store it, and return an ID', () => {
      const receiptDto: RecieptRequestDto = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
          { shortDescription: 'Knorr Creamy Chicken', price: '1.26' },
          { shortDescription: 'Doritos Nacho Cheese', price: '3.35' },
          { shortDescription: 'Klarbrunn 12-PK 12 FL OZ', price: '12.00' },
        ],
        total: '35.35',
      };

      const result = receiptsService.create(receiptDto);
      expect(result).toHaveProperty('id');
      expect(typeof result.id).toBe('string');
    });
  });

  describe('findOne', () => {
    it('should return points for an existing receipt', () => {
      const receiptDto: RecieptRequestDto = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
          { shortDescription: 'Knorr Creamy Chicken', price: '1.26' },
          { shortDescription: 'Doritos Nacho Cheese', price: '3.35' },
          { shortDescription: 'Klarbrunn 12-PK 12 FL OZ', price: '12.00' },
        ],
        total: '35.35',
      };

      const { id } = receiptsService.create(receiptDto);
      
      expect(receiptsService.findOne(id)).toEqual({ points: 28 });
    });

    it('should throw NotFoundException if receipt is not found', () => {
      expect(() => receiptsService.findOne('non-existent-id'))
        .toThrowError(new NotFoundException('No receipt found for that ID.'));
    });
  });

  describe('findAll', () => {
    it('should return all stored receipts', () => {
      const receiptDto: RecieptRequestDto = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
          { shortDescription: 'Knorr Creamy Chicken', price: '1.26' },
          { shortDescription: 'Doritos Nacho Cheese', price: '3.35' },
          { shortDescription: 'Klarbrunn 12-PK 12 FL OZ', price: '12.00' },
        ],
        total: '35.35',
      };

      const { id } = receiptsService.create(receiptDto);
      
      expect(receiptsService.findAll()).toHaveProperty(id, 28);
    });
  });
});
