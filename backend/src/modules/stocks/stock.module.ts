import { Module } from '@nestjs/common';
import { StockController } from './controllers/stock.controller';
import { StockService } from './services/stock.service';
import { VarianceRepository } from './repositories/VarianceRepository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([VarianceRepository]),
    NestjsFormDataModule,
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
