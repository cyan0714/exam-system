import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { AuthGuard, CommonModule } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [CommonModule, RedisModule, PrismaModule],
  controllers: [ExamController],
  providers: [
    ExamService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ExamModule {}
