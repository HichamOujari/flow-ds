import { IsInt, IsString } from 'class-validator';

export class PredictionQuery {
  @IsString()
  user: string;

  @IsString()
  company: string;

  @IsInt()
  amount: number;
}
