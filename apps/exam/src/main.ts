import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(parseInt(process.env.EXAM_SERVICE_PORT) || 3002);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.MICROSERVICE_PORT) || 8888,
    },
  });
  app.startAllMicroservices();
}
bootstrap();
