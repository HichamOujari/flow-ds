// import-script.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { StockService } from '../modules/stocks/services/stock.service';
import * as fs from 'fs'; // Import the 'fs' module for file operations
import { ImportJsonDto } from '../modules/stocks/dto/import-json.dto';

async function runImport() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const stockService = app.get(StockService);

  try {
    const jsonData = JSON.parse(
      fs.readFileSync('./assets/data.json', 'utf8'),
    ) as ImportJsonDto[];

    await stockService.importData(jsonData);
    console.log('JSON data imported successfully.');
  } catch (error) {
    console.error('Error importing JSON data:', error);
  } finally {
    await app.close();
  }
}

runImport();
