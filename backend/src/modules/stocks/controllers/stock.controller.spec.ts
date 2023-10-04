import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from '../services/stock.service';
import { FilterStatsDto } from '../dto/filter-stats.dto';
import { PredictionQuery } from '../dto/prediction-query.dto';
import { PredictionResponse } from '../dto/prediction-response.dto';
import { VarianceRepository } from '../repositories/VarianceRepository';

describe('StockController', () => {
  let controller: StockController;
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService, VarianceRepository],
    }).compile();

    controller = module.get<StockController>(StockController);
    service = module.get<StockService>(StockService);
  });

  describe('getStats', () => {
    it('should return stock stats', async () => {
      const filterStatsDto: FilterStatsDto = { list: ['AMAZON'] };
      const expectedStats = {
        AMAZON: [1, 2, 3, 4, 5],
      };
      jest.spyOn(service, 'getStats').mockResolvedValue(expectedStats);

      const result = await controller.getStats(filterStatsDto);

      expect(result).toBe(expectedStats);
    });
  });

  describe('getPrediction', () => {
    it('should return stock prediction', async () => {
      const predictionQuery: PredictionQuery = {
        user: 'hicham',
        company: 'AMAZON',
        amount: 100000,
      };
      const expectedPrediction = new PredictionResponse();
      jest
        .spyOn(service, 'getPrediction')
        .mockResolvedValue(expectedPrediction);

      const result = await controller.getPrediction(predictionQuery);

      expect(result).toBe(expectedPrediction);
    });
  });
});
