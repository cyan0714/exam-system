import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { EmailModule } from '@app/email';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule, AuthGuard } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CommonModule,
    RedisModule,
    PrismaModule,
    EmailModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'Cyan',
          signOptions: {
            expiresIn: '30m', // 默认 30 分钟
          },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
