import { NestFactory } from '@nestjs/core';
import { AnswerModule } from './answer.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AnswerModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(parseInt(process.env.ANSWER_SERVICE_PORT) || 3003);
}
bootstrap();
