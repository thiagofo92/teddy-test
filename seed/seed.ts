import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import { LoginMock } from '../src/infra/repository/__test__/mock/login.mock'

  ; import { randomUUID } from 'crypto';
import { ShortUrlMock } from '@/infra/repository/__test__/mock';
(async () => {
  try {
    const conn = new PrismaClient()
    console.log('-------- START SEED -----------')
    const promises = []

    await seedLogin(conn)
    await seedShortUrl(conn)

  } catch (error) {
    console.log(error)
  }
  console.log('-------- END SEED -----------')
  process.exit(0)
})()


async function seedLogin(conn: PrismaClient) {
  const input = [
    {
      id: LoginMock.main.id,
      uuid: randomUUID(),
      salt: '1234',
      ...LoginMock.main.entity
    },
    {
      uuid: randomUUID(),
      salt: '5678',
      ...LoginMock.exist.entity
    }
  ]
  return conn.login.createMany({
    data: input
  })
}

async function seedShortUrl(conn: PrismaClient) {
  const input = [
    {
      id: ShortUrlMock.main.id,
      userId: LoginMock.main.id,
      urlShorted: ShortUrlMock.main.entity.getShortedUrl(),
      urlOriginal: ShortUrlMock.main.entity.url,
      count: ShortUrlMock.main.entity.getCount(),
    },
    {
      id: ShortUrlMock.toupdate.id,
      urlShorted: ShortUrlMock.toupdate.entity.getShortedUrl(),
      urlOriginal: ShortUrlMock.toupdate.entity.url,
      count: ShortUrlMock.toupdate.entity.getCount(),
    },
    {
      id: ShortUrlMock.tofindurl.id,
      urlShorted: ShortUrlMock.tofindurl.entity.getShortedUrl(),
      urlOriginal: ShortUrlMock.tofindurl.entity.url,
      count: ShortUrlMock.tofindurl.entity.getCount(),
    },
    {
      id: ShortUrlMock.todelete.id,
      urlShorted: ShortUrlMock.todelete.entity.getShortedUrl(),
      urlOriginal: ShortUrlMock.todelete.entity.url,
      count: ShortUrlMock.todelete.entity.getCount(),
    },
  ]
  return conn.url.createMany({
    data: input
  })
}
