import { IsString } from 'class-validator';
import { AfterLoad } from 'typeorm';

export class FilterStatsDto {
  @IsString({ each: true })
  list: string[];
}

export class StatsResponse {
  month: string;
  moy: string;
  company: string;
}
