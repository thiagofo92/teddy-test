import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlUseCase } from '@/app/usecase';
import { LoginRepository, ShortUrlRepository } from '@/infra/repository';
import { LoginRepositoryPort, ShortUrlRepositoryPort } from '@/infra/repository/port';
import { PrismaConnect } from '@/infra/repository/prisma.repository';
import { ShortUrlUseCasePort } from '@/app/usecase/port';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ShortUrlController],
  providers: [
    {
      provide: ShortUrlUseCasePort,
      useFactory: (shortRepository, loginRepository) => {
        return new ShortUrlUseCase(shortRepository, loginRepository)
      },
      inject: [ShortUrlRepositoryPort, LoginRepositoryPort],
    },
    {
      provide: ShortUrlRepositoryPort,
      useFactory: (conn) => new ShortUrlRepository(conn),
      inject: [PrismaConnect]
    },
    {
      provide: LoginRepositoryPort,
      useFactory: (conn) => new LoginRepository(conn),
      inject: [PrismaConnect]
    },
    PrismaConnect,
    JwtService
  ]
})
export class ShortUrlModule { }
