import { Module } from '@nestjs/common';
import { LoginModule } from './controllers/login/login.module';
import { ShortUrlModule } from './controllers/short-url/short-url.module';
import { ConfigModule } from '@nestjs/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    LoginModule,
    ShortUrlModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 15
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }
