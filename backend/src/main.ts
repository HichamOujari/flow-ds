import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  app.enableCors({
    origin: (origin, cb) => {
      cb(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.use(urlencoded({ extended: false }));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
