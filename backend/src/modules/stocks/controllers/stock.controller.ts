import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { FilterStatsDto } from '../dto/filter-stats.dto';
import { PredictionQuery } from '../dto/prediction-query.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('stats')
  getStats(@Body() filterStatsDto: FilterStatsDto) {
    return this.stockService.getStats(filterStatsDto);
  }

  @Get('prediction')
  getPrediction(@Query() predictionQuery: PredictionQuery) {
    return this.stockService.getPrediction(predictionQuery);
  }
}
