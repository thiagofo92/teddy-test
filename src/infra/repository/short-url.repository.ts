import { Either, Left, left, right } from "@/shared/error";
import { ShortUrlReponseCreate, ShortUrlRepositoryPort } from "./port";
import { PrismaConnect } from "./prisma.repository";
import { InternalServerError, NotContent, NotFoundError } from "@/shared/error/general.error";
import { ShortUrlEntity } from "@/core/entity";
import { Injectable } from "@nestjs/common";
import { Logger } from "@/shared/logger";
import { ShortUrlFindUrl, ShortUrlOutPut } from "@/app/dto/output/short-url.dto.output";

@Injectable()
export class ShortUrlRepository implements ShortUrlRepositoryPort {
  constructor(private readonly conn: PrismaConnect) { }

  async create(input: ShortUrlEntity): Promise<Either<InternalServerError, ShortUrlReponseCreate>> {
    try {
      const result = await this.conn.url.create({
        data: {
          urlOriginal: input.url,
          urlShorted: input.getShortedUrl(),
          count: input.getCount(),
        }
      })
      return right({ id: result.id })
    } catch (error) {
      Logger.error(error.message || error.message)
      return left(new InternalServerError())
    }
  }

  async update(id: number, input: ShortUrlEntity): Promise<Either<InternalServerError | NotFoundError, boolean>> {
    try {
      await this.conn.url.update({
        where: {
          id
        },
        data: {
          urlOriginal: input.url,
          lastUpdateUrl: new Date()
        }
      })
      return right(true)
    } catch (error) {
      Logger.error(error.message || error.message)
      if (error.code == 'P2025') return left(new NotFoundError())
      return left(new InternalServerError())
    }
  }


  async updateCount(id: number, count: number): Promise<Either<InternalServerError | NotFoundError, boolean>> {
    try {
      await this.conn.url.update({
        where: {
          id
        },
        data: {
          count,
          lastUpdateCount: new Date()
        }
      })
      return right(true)
    } catch (error) {
      Logger.error(error.message || error.message)
      if (error.code == 'P2025') return left(new NotFoundError())
      return left(new InternalServerError())
    }
  }

  async findById(id: number): Promise<Either<InternalServerError | NotContent, ShortUrlOutPut>> {
    try {
      const result = await this.conn.url.findUnique({
        where: {
          id
        }
      })

      if (!result) return left(new NotFoundError())

      const entity = {
        userId: result.userId,
        id: result.id,
        urlOriginal: result.urlOriginal,
        urlShorted: result.urlShorted,
        count: result.count,
        lastUpdateUrl: result.lastUpdateUrl,
        lastUpdateCount: result.lastUpdateCount
      }

      return right(entity)
    } catch (error) {
      Logger.error(error.message || error.message)
      return left(new InternalServerError())
    }
  }

  async findAll(userId: number): Promise<Either<InternalServerError | NotContent, ShortUrlOutPut[]>> {
    try {
      const result = await this.conn.url.findMany({
        where: {
          deleted: false,
          userId: userId
        }
      })

      if (result.length <= 0) return left(new NotContent())

      const entities = result.map(item => ({
        userId: item.userId,
        id: item.id,
        urlOriginal: item.urlOriginal,
        urlShorted: item.urlShorted,
        count: item.count,
        lastUpdateUrl: item.lastUpdateUrl,
        lastUpdateCount: item.lastUpdateCount
      }))

      return right(entities)
    } catch (error) {
      Logger.error(error.message || error.message)
      console.log(error)
      if (error.code == 'P2025') return left(new NotFoundError())
      return left(new InternalServerError())
    }
  }

  async findByShortedUrl(url: string): Promise<Either<InternalServerError | NotContent, ShortUrlFindUrl>> {
    try {
      const result = await this.conn.url.findFirst({
        where: {
          deleted: false,
          urlShorted: url
        }
      })

      if (!result) return left(new NotFoundError())

      return right({
        id: result.id,
        urlOriginal: result.urlOriginal,
        count: result.count
      })

    } catch (error) {
      Logger.error(error.message || error.message)
      if (error.code == 'P2025') return left(new NotFoundError())
      return left(new InternalServerError())
    }
  }

  async delete(id: number): Promise<Either<InternalServerError | NotFoundError, boolean>> {
    try {
      await this.conn.url.update({
        where: {
          id
        },
        data: {
          deleted: true
        }
      })

      return right(true)
    } catch (error) {
      Logger.error(error.message || error.name)
      if (error.code == 'P2025') return left(new NotFoundError())
      return left(new InternalServerError())
    }
  }
}
