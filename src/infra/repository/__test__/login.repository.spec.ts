import { describe, test, expect, beforeEach } from 'vitest'
import { Test } from '@nestjs/testing'
import { LoginRepository } from '../login.repository'
import { PrismaConnect } from '../prisma.repository'
import { LoginEntity } from '@/core/entity'
import { Right } from '@/shared/error'
import { LoginMock } from './mock'
import { LoginAlreadyExistError, LoginAuthorizedError } from '@/shared/error/login.error'
import { LoginRepositoryPort } from '../port'

describe('# Login - Unit', () => {
  let conn: PrismaConnect
  let rp: LoginRepositoryPort

  beforeEach(async () => {
    conn = new PrismaConnect()
    rp = new LoginRepository(conn)
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: LoginRepositoryPort,
          useFactory: (conn) => new LoginRepository(conn),
          inject: [PrismaConnect]
        }, PrismaConnect
      ],
    }).compile();

    rp = moduleRef.get<LoginRepositoryPort>(LoginRepositoryPort);
  })

  test('Create - [SUCESS] - "Create a new login"', async () => {
    const input: LoginEntity = LoginMock.main.entity

    const result = await rp.create(input) as Right<Error, { id: string }>
    expect(result.value.id).toBeTypeOf('string')
    expect(result.value.id).not.toStrictEqual('')
  })

  test('Create - [ERROR] - "Email already registered"', async () => {
    const input: LoginEntity = LoginMock.exist.entity

    const result = await rp.create(input)
    expect(result.value).toBeInstanceOf(LoginAlreadyExistError)
  })

  test('Auth - [SUCESS] - "Login authorized"', async () => {
    const input: LoginEntity = LoginMock.main.entity
    const result = await rp.auth(input.email, input.pass) as Right<Error, { id: string }>
    expect(result.value.id).toBeTypeOf('string')
    expect(result.value.id).not.toStrictEqual('')
  })

  test('Auth - [ERROR] - "Invalid login"', async () => {
    const input: LoginEntity = LoginMock.main.entity

    const result = await rp.auth(input.email, input.pass + 'invalid')
    expect(result.value).toBeInstanceOf(LoginAuthorizedError)
  })
})
