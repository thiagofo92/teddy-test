import { ShortUrlEntity } from "@/core/entity"
import { ShortUrlFindUrl, ShortUrlOutPut } from "@/app/dto/output/short-url.dto.output"
import { Either } from "@/shared/error"
import { InternalServerError, NotContent, NotFoundError } from "@/shared/error/general.error"

export interface ShortUrlReponseCreate {
  id: number
}

export abstract class ShortUrlRepositoryPort {
  create: (input: ShortUrlEntity) => Promise<Either<InternalServerError, ShortUrlReponseCreate>>
  update: (id: number, input: ShortUrlEntity) => Promise<Either<InternalServerError | NotFoundError, boolean>>
  updateCount: (id: number, count: number) => Promise<Either<InternalServerError | NotFoundError, boolean>>
  // TODO Add type to be returned
  findAll: (userId: number) => Promise<Either<InternalServerError | NotContent, ShortUrlOutPut[]>>
  findById: (id: number) => Promise<Either<InternalServerError | NotContent, ShortUrlOutPut>>
  findByShortedUrl: (url: string) => Promise<Either<InternalServerError | NotContent, ShortUrlFindUrl>>
  delete: (id: number) => Promise<Either<InternalServerError | NotFoundError, boolean>>
}
