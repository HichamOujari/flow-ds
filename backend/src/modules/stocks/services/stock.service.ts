import { BadRequestException, Injectable } from '@nestjs/common';
import { VarianceRepository } from '../repositories/VarianceRepository';
import { FilterStatsDto } from '../dto/filter-stats.dto';
import { PredictionQuery } from '../dto/prediction-query.dto';
import { ImportJsonDto } from '../dto/import-json.dto';
import { Variance } from '../entities/Variance.entity';
import { PredictionResponse } from '../dto/prediction-response.dto';

@Injectable()
export class StockService {
  constructor(private readonly varianceRepository: VarianceRepository) {}

  async getStats(filterStatsDto: FilterStatsDto) {
    const data = await this.varianceRepository.getStats(filterStatsDto);
    const rslt = {};
    if (data)
      data.map((ele) => {
        if (rslt[ele.company]) rslt[ele.company].push(parseFloat(ele.moy));
        else rslt[ele.company] = [parseFloat(ele.moy)];
      });
    return rslt;
  }

  async getPrediction(predictionQuery: PredictionQuery) {
    const data = await this.varianceRepository.find({
      where: {
        company: predictionQuery.company,
      },
      order: {
        timestamp: 'ASC',
      },
    });
    return this.getBestBuyingSellingDate(data, predictionQuery);
  }

  private async getBestBuyingSellingDate(
    stockList: Variance[],
    predictionQuery: PredictionQuery,
  ): Promise<PredictionResponse> {
    const rsp = new PredictionResponse();
    rsp.amount = predictionQuery.amount;
    rsp.fullName = predictionQuery.user;
    rsp.company = predictionQuery.company;
    if (stockList.length == 0) throw new BadRequestException('no data');
    else if (stockList.length == 1) {
      rsp.buyingDate = stockList[0].timestamp;
      rsp.sellingDate = stockList[0].timestamp;
      rsp.sellingPrice = stockList[0].highestPriceOfTheDay;
      rsp.buyingPrice = stockList[0].lowestPriceOfTheDay;
      rsp.gain = parseFloat(
        (
          (stockList[0].highestPriceOfTheDay -
            stockList[0].lowestPriceOfTheDay) *
          predictionQuery.amount
        ).toFixed(2),
      );
      return rsp;
    }

    let buyingPrice;
    let buyingDate;
    let sellingPrice;
    let sellingDate;
    let profit = 0;

    const tmp: number[] = [];

    for (let i = 0; i < stockList.length - 2; i++) {
      if (
        stockList[i].highestPriceOfTheDay - stockList[i].lowestPriceOfTheDay >
        profit
      ) {
        profit =
          stockList[i].highestPriceOfTheDay - stockList[i].lowestPriceOfTheDay;
        buyingDate = stockList[i].timestamp;
        sellingDate = stockList[i].timestamp;
        buyingPrice = stockList[i].lowestPriceOfTheDay;
        sellingPrice = stockList[i].highestPriceOfTheDay;
      }
      for (let j = i + 1; j < stockList.length - 1; j++) {
        if (
          stockList[j].highestPriceOfTheDay - stockList[i].lowestPriceOfTheDay >
          profit
        ) {
          profit =
            stockList[j].highestPriceOfTheDay -
            stockList[i].lowestPriceOfTheDay;
          buyingDate = stockList[i].timestamp;
          sellingDate = stockList[j].timestamp;
          buyingPrice = stockList[i].lowestPriceOfTheDay;
          sellingPrice = stockList[j].highestPriceOfTheDay;
        }
      }
    }

    rsp.buyingDate = buyingDate;
    rsp.sellingDate = sellingDate;
    rsp.sellingPrice = sellingPrice;
    rsp.buyingPrice = buyingPrice;
    rsp.gain = parseFloat(
      ((sellingPrice - buyingPrice) * predictionQuery.amount).toFixed(2),
    );

    return rsp;
  }

  async importData(data: ImportJsonDto[]) {
    const isFilled = await this.varianceRepository.findOne();
    if (!isFilled && data && data.length)
      await Promise.all(
        data.map((ele) =>
          this.varianceRepository.save(
            this.varianceRepository.create({
              ...ele,
              timestamp: new Date(ele.timestamp),
            }),
          ),
        ),
      );
    else console.log('==> already filled');
  }
}
