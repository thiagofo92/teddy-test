import { ResponseFormated, responseData, responseError } from "@/util/response.util";
import { ShortUrlDtoInput, ShortUrlUpdateDtoInput } from "../dto";
import { ShortUrlUseCasePort } from "./port";
import { HTTP_CODE_UTIL } from "@/util/http-code.util";
import { LoginRepositoryPort, ShortUrlRepositoryPort } from "@/infra/repository/port";
import { ShortUrlEntity } from "@/core/entity";

export class ShortUrlUseCase implements ShortUrlUseCasePort {
  constructor(private readonly rp: ShortUrlRepositoryPort, private readonly loginRp: LoginRepositoryPort) { }
  async create<T = any>(input: ShortUrlDtoInput): Promise<ResponseFormated<T>> {

    if (input.userUUID) {
      const result = await this.loginRp.findByUUID(input.userUUID)
      if (result.isRight()) input.userId = result.value.id
    }

    const entity = new ShortUrlEntity(input.url, 1, input.userId)
    entity.execute()

    const result = await this.rp.create(entity)

    if (result.isLeft()) {

      return responseError(result.value)
    }

    return responseData({ url: entity.getDomainShorted() }, HTTP_CODE_UTIL.CREATED)
  }

  async update<T = any>(input: ShortUrlUpdateDtoInput): Promise<ResponseFormated<T>> {
    const entity = new ShortUrlEntity(input.url)
    const result = await this.rp.update(input.id, entity)
    if (result.isLeft()) {
      return responseError(result.value)
    }
    return responseData({}, HTTP_CODE_UTIL.NO_CONTENT)
  }

  async findAll<T = any>(userId: string): Promise<ResponseFormated<T>> {
    const login = await this.loginRp.findByUUID(userId)

    if (login.isLeft()) {
      return responseError(login.value)
    }

    const result = await this.rp.findAll(login.value.id)

    if (result.isLeft()) {
      return responseError(result.value)
    }
    return responseData(result.value, HTTP_CODE_UTIL.OK)
  }

  async findByUrlShorted<T = any>(url: string): Promise<ResponseFormated<T>> {
    const result = await this.rp.findByShortedUrl(url)
    if (result.isLeft()) {
      return responseError(result.value)
    }

    const count = result.value.count + 1
    const up = await this.rp.updateCount(result.value.id, count)

    if (up.isLeft()) {
      return responseError(up.value)
    }

    return responseData(result.value.urlOriginal, HTTP_CODE_UTIL.OK)
  }

  async delete<T = any>(id: number): Promise<ResponseFormated<T>> {
    const result = await this.rp.delete(id)
    if (result.isLeft()) {
      return responseError(result.value)
    }
    return responseData({}, HTTP_CODE_UTIL.NO_CONTENT)
  }
}
