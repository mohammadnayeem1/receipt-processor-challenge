import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

describe('ReceiptsController', () => {
  let controller: ReceiptsController;
  let receiptsService: ReceiptsService;

  beforeEach(async () => {
    const mockReceiptsService = {
      create: jest.fn().mockReturnValue({ id: 'test-id' }),
      findOne: jest.fn().mockReturnValue({ points: 28 }),
      findAll: jest.fn().mockReturnValue({ 'test-id': 28 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptsController],
      providers: [
        {
          provide: ReceiptsService,
          useValue: mockReceiptsService,
        },
      ],
    }).compile();

    controller = module.get<ReceiptsController>(ReceiptsController);
    receiptsService = module.get<ReceiptsService>(ReceiptsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return an ID after processing receipt', () => {
      const dto = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [{ shortDescription: 'Test Item', price: '5.00' }],
        total: '10.00',
      };

      expect(controller.create(dto)).toEqual({ id: 'test-id' });
      expect(receiptsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return points for a valid receipt ID', () => {
      expect(controller.findOne('test-id')).toEqual({ points: 28 });
      expect(receiptsService.findOne).toHaveBeenCalledWith('test-id');
    });
  });

  describe('findAll', () => {
    it('should return all stored receipts', () => {
      expect(controller.findAll()).toEqual({ 'test-id': 28 });
      expect(receiptsService.findAll).toHaveBeenCalled();
    });
  });
});
