import { Module } from '@nestjs/common';
import { LoginModule } from './controllers/login/login.module';
import { ShortUrlModule } from './controllers/short-url/short-url.module';

@Module({
  imports: [LoginModule, ShortUrlModule],
})
export class AppModule { }
