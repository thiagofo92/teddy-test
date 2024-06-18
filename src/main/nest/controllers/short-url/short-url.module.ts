import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';

@Module({
  controllers: [ShortUrlController]
})
export class ShortUrlModule {}
