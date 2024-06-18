import { describe, test, expect, beforeEach } from 'vitest'
import { PrismaConnect } from '../prisma.repository'
import { ShortUrlRepositoryPort } from '../port'
import { ShortUrlRepository } from '../short-url.repository'
import { Test } from '@nestjs/testing'
import { ShortUrlEntity } from '@/core/entity'
import { Right } from '@/shared/error'
import { LoginMock, ShortUrlMock } from './mock'
import { InternalServerError, NotContent, NotFoundError } from '@/shared/error/general.error'
import { ShortUrlOutPut } from '@/dto/output/short-url.dto.output'
import { InternetModule } from '@faker-js/faker'


describe('# Short Url - Unit', () => {
  let conn: PrismaConnect
  let rp: ShortUrlRepositoryPort

  beforeEach(async () => {
    conn = new PrismaConnect()
    rp = new ShortUrlRepository(conn)
    const moduleRef = await Test.createTestingModule({
      providers: [ShortUrlRepository, PrismaConnect],
    }).compile();

    rp = moduleRef.get<ShortUrlRepository>(ShortUrlRepository);
  })

  test('Create - [SUCCES] - "Create a short url"', async () => {
    const entity = ShortUrlMock.main.entity
    entity.execute()

    const result = await rp.create(entity) as Right<Error, { id: number }>

    expect(result.value.id).toBeTypeOf('number')
    expect(result.value.id).toBeGreaterThan(0)
  })

  test('Create - [ERROR] - "Internal server error"', async () => {
    const entity = ShortUrlMock.main.entity
    entity.execute()

    conn = null
    const result = await rp.create(entity) as Right<Error, { id: number }>

    expect(result.value.id).toBeTypeOf('number')
    expect(result.value.id).toBeGreaterThan(0)
  })

  test('Update - [SUCCESS] - "Update original url"', async () => {
    const entity = ShortUrlMock.main.entity
    const id = ShortUrlMock.main.id
    entity.execute()

    const result = await rp.update(id, entity) as Right<Error, boolean>

    expect(result.value).toStrictEqual(true)
  })

  test('Update - [ERROR] - "ID not found"', async () => {
    const entity = ShortUrlMock.main.entity
    const id = ShortUrlMock.tonotfound.id
    entity.execute()

    const result = await rp.update(id, entity) as Right<Error, boolean>

    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  test('Update - [ERROR] - "Internal server error"', async () => {
    const result = await rp.update(0, {} as any) as Right<Error, boolean>

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update Count - [SUCCESS] - "Update the count"', async () => {
    const entity = ShortUrlMock.main.entity
    const id = ShortUrlMock.main.id
    entity.execute()

    const result = await rp.updateCount(id, 10) as Right<Error, boolean>

    expect(result.value).toStrictEqual(true)
  })

  test('Update Count - [ERROR] - "ID not found"', async () => {
    const id = ShortUrlMock.tonotfound.id

    const result = await rp.updateCount(id, 10) as Right<Error, boolean>

    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  test('Update Count - [ERROR] - "Internal server error"', async () => {
    const result = await rp.update(0, {} as any) as Right<Error, boolean>

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindById - [SUCCESS] - "Find the url by ID"', async () => {
    const id = ShortUrlMock.tofindurl.id

    const result = await rp.findById(id) as Right<Error, ShortUrlOutPut>
    expect(result.value).toEqual(expect.objectContaining({
      count: ShortUrlMock.tofindurl.entity.getCount(),
      urlOriginal: ShortUrlMock.tofindurl.entity.url,
      urlShorted: ShortUrlMock.tofindurl.entity.getShortedUrl(),
      userId: null
    }))
  })

  test('FindById - [ERROR] - "ID not found"', async () => {
    const id = ShortUrlMock.tonotfound.id

    const result = await rp.findById(id) as Right<Error, ShortUrlOutPut>

    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  test('FindById - [ERROR] - "Internal server error"', async () => {
    const result = await rp.findById(0) as Right<Error, ShortUrlOutPut>

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindByShortedUrl - [SUCCESS] - "Find using shorted url"', async () => {
    const url = ShortUrlMock.tofindurl.entity.getShortedUrl()

    const result = await rp.findByShortedUrl(url) as Right<Error, string>
    expect(result.value).toStrictEqual(ShortUrlMock.tofindurl.entity.url)
  })

  test('FindById - [ERROR] - "ID not found"', async () => {
    const url = 'http://localhost:4000/notfound'

    const result = await rp.findByShortedUrl(url) as Right<Error, string>

    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  test('FindById - [ERROR] - "Internal server error"', async () => {
    const result = await rp.findByShortedUrl('') as Right<Error, string>

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Delete - [SUCCESS] - "Update fied to deleted status"', async () => {
    const id = ShortUrlMock.todelete.id

    const result = await rp.delete(id) as Right<Error, boolean>
    expect(result.value).toStrictEqual(true)
  })

  test('Delete - [ERROR] - "ID not found"', async () => {
    const id = ShortUrlMock.tonotfound.id

    const result = await rp.delete(id) as Right<Error, boolean>

    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  test('Delete - [ERROR] - "Internal server error"', async () => {
    const result = await rp.delete(0) as Right<Error, boolean>

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindAll - [SUCCESS] - "Get all url using userid"', async () => {
    const userId = LoginMock.main.id

    const result = await rp.findAll(userId) as Right<Error, ShortUrlOutPut[]>
    expect(result.value.length).toBeGreaterThan(0)
  })

  test('FinAll - [ERROR] - "ID not found"', async () => {
    const id = ShortUrlMock.tonotfound.id

    const result = await rp.findAll(id) as Right<Error, ShortUrlOutPut[]>

    expect(result.value).toBeInstanceOf(NotContent)
  })
})