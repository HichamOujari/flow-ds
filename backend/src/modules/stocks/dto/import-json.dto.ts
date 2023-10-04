import { IsInt, IsString } from 'class-validator';

export class ImportJsonDto {
  @IsString()
  company: string;

  @IsInt()
  v: number;

  @IsInt()
  vw: number;

  @IsInt()
  o: number;

  @IsInt()
  c: number;

  @IsInt()
  highestPriceOfTheDay: number;

  @IsInt()
  lowestPriceOfTheDay: number;
  
  @IsInt()
  timestamp: number;

  @IsInt()
  n: number;
}
