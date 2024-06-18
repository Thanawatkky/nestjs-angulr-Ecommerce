import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiePre from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookiePre());
  await app.listen(3000);
}
bootstrap();
