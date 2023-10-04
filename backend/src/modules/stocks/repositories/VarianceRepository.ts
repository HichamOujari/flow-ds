import { Connection, EntityRepository, In, Repository } from 'typeorm';
import { Variance } from '../entities/Variance.entity';
import { FilterStatsDto, StatsResponse } from '../dto/filter-stats.dto';

@EntityRepository(Variance)
export class VarianceRepository extends Repository<Variance> {
  constructor() {
    super();
  }

  async getStats(filterStatsDto: FilterStatsDto): Promise<StatsResponse[]> {
    return this.createQueryBuilder('v')
      .where({
        company: In(filterStatsDto.list),
      })
      .select("DATE_FORMAT(timestamp, '%m') AS month")
      .addSelect(
        'AVG((v.lowest_price_of_the_day + v.highest_price_of_the_day) / 2) AS moy',
      )
      .addSelect('company')
      .groupBy('v.company, month')
      .orderBy('month')
      .getRawMany();
  }
}

export const VarianceRepositoryProvider = {
  provide: 'VarianceRepository',
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(VarianceRepository),
  inject: [Connection],
};
