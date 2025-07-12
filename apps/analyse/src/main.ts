import { NestFactory } from '@nestjs/core';
import { AnalyseModule } from './analyse.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyseModule);
  app.enableCors();
  await app.listen(parseInt(process.env.ANALYSE_SERVICE_PORT) || 3004);
}
bootstrap();
