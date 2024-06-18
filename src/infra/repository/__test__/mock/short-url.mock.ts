import { ShortUrlEntity } from "@/core/entity"
import { faker } from "@faker-js/faker"

type IdAndShortUrl = {
  id: number,
  entity: ShortUrlEntity
}

type ShortUrlType = {
  main: IdAndShortUrl
  toupdate: IdAndShortUrl
  todelete: IdAndShortUrl
  tofindurl: IdAndShortUrl
  tonotfound: { id: number }
}

const main = new ShortUrlEntity('http://locahost:3000/test')
//@ts-ignore
main.shortedUrl = '000000'
const ShortUrlMock: ShortUrlType = {
  main: {
    id: 1,
    entity: main
  },
  tofindurl: {
    id: 2,
    entity: new ShortUrlEntity('http://localhost:5000/test', 10)
  },
  toupdate: {
    id: 3,
    entity: new ShortUrlEntity('http://localhost:5000/test', 10)
  },
  todelete: {
    id: 4,
    entity: new ShortUrlEntity('http://localhost:5000/test', 10)
  },
  tonotfound: {
    id: 30
  }
}
//@ts-ignore
ShortUrlMock.tofindurl.entity.shortedUrl = '111111'
//@ts-ignore
ShortUrlMock.toupdate.entity.shortedUrl = '222222'
//@ts-ignore
ShortUrlMock.todelete.entity.shortedUrl = '333333'

export { ShortUrlMock }
