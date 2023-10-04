import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { VarianceRepository } from '../repositories/VarianceRepository';
import { BadRequestException } from '@nestjs/common';
import { FilterStatsDto } from '../dto/filter-stats.dto';
import { PredictionQuery } from '../dto/prediction-query.dto';
import { ImportJsonDto } from '../dto/import-json.dto';

const dummy = [
  {
    id: 1,
    company: 'GOOGLE',
    highestPriceOfTheDay: 145.55,
    lowestPriceOfTheDay: 143.503,
    timestamp: '2022-01-03T05:00:00.000Z',
  },
];

describe('StockService', () => {
  let stockService: StockService;
  let varianceRepository: VarianceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: VarianceRepository,
          useValue: {
            getStats: jest.fn((filterStatsDto: FilterStatsDto) => {
              return [];
            }),
            find: jest.fn(({ where, order }) => {
              if (where.company == 'GOOGLE') return dummy;

              return [];
            }),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    stockService = module.get<StockService>(StockService);
    varianceRepository = module.get<VarianceRepository>(VarianceRepository);
  });

  describe('getStats', () => {
    it('should return statistics', async () => {
      const filterStatsDto: FilterStatsDto = {
        list: ['AMAZON'],
      };

      const result = await stockService.getStats(filterStatsDto);

      expect(result).toEqual({});
    });
  });

  describe('getPrediction', () => {
    it('should return a prediction response', async () => {
      const predictionQuery: PredictionQuery = {
        user: 'hicham',
        company: 'GOOGLE',
        amount: 100000,
      };

      const result = await stockService.getPrediction(predictionQuery);

      expect(result.sellingPrice).toEqual(dummy[0].highestPriceOfTheDay);
    });

    it('should throw BadRequestException if no data is found', async () => {
      const predictionQuery: PredictionQuery = {
        user: 'hicham',
        company: 'AMAZON',
        amount: 100000,
      };

      await expect(stockService.getPrediction(predictionQuery)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
