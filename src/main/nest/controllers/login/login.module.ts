import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginUseCase } from '@/app/usecase';
import { LoginUseCasePort } from '@/app/usecase/port';
import { LoginRepository } from '@/infra/repository';
import { LoginRepositoryPort } from '@/infra/repository/port';
import { PrismaConnect } from '@/infra/repository/prisma.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [
    {
      provide: LoginUseCasePort,
      useFactory: (repository, jwt) => {
        return new LoginUseCase(repository, jwt)
      },
      inject: [LoginRepositoryPort, JwtService],
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
export class LoginModule { }
