import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import { LoginMock } from '../src/infra/repository/__test__/mock/login.mock'

  ; import { randomUUID } from 'crypto';
(async () => {
  try {
    const conn = new PrismaClient()
    console.log('-------- START SEED -----------')
    const promises = []

    promises.push(seedLogin(conn))
    const result = await Promise.allSettled(promises)

    for (const r of result) {
      if (r.status == 'rejected') console.log(r.reason)
    }

  } catch (error) {
    console.log(error)
  }
  console.log('-------- END SEED -----------')
  process.exit(0)
})()


async function seedLogin(conn: PrismaClient) {
  const input = [
    {
      uuid: randomUUID(),
      salt: '1234',
      ...LoginMock.main
    },
    {
      uuid: randomUUID(),
      salt: '5678',
      ...LoginMock.exist
    }
  ]
  return conn.login.createMany({
    data: input
  })
}

async function seedUrl(conn) {
  return conn.login.create({
    data: LoginMock
  })
}
