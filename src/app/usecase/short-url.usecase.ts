import { ResponseFormated, responseData, responseError } from "@/util/response.util";
import { ShortUrlDtoInput, ShortUrlUpdateDtoInput } from "../dto";
import { ShortUrlUseCasePor } from "./port";
import { HTTP_CODE_UTIL } from "@/util/http-code.util";
import { LoginRepositoryPort, ShortUrlRepositoryPort } from "@/infra/repository/port";
import { ShortUrlEntity } from "@/core/entity";

export class ShortUrlUseCase implements ShortUrlUseCasePor {
  constructor(private readonly rp: ShortUrlRepositoryPort, private readonly loginRp: LoginRepositoryPort) { }
  async create<T = any>(input: ShortUrlDtoInput): Promise<ResponseFormated<T>> {

    const entity = new ShortUrlEntity(input.url)
    entity.execute()

    const result = await this.rp.create(entity)

    if (result.isLeft()) {
      return responseError(result.value)
    }

    return responseData({}, HTTP_CODE_UTIL.CREATED)
  }

  async update<T = any>(id: number, input: ShortUrlUpdateDtoInput): Promise<ResponseFormated<T>> {
    const entity = new ShortUrlEntity(input.url)

    const result = await this.rp.update(id, entity)
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
    return responseData({}, HTTP_CODE_UTIL.OK)
  }

  async findByUrlShorted<T = any>(url: string): Promise<ResponseFormated<T>> {
    const result = await this.rp.findByShortedUrl(url)
    if (result.isLeft()) {
      return responseError(result.value)
    }

    const up = await this.rp.updateCount(result.value.id, result.value.count++)
    return responseData(up, HTTP_CODE_UTIL.OK)
  }

  async delete<T = any>(id: number): Promise<ResponseFormated<T>> {
    const result = await this.rp.delete(id)
    if (result.isLeft()) {
      return responseError(result.value)
    }
    return responseData({}, HTTP_CODE_UTIL.NO_CONTENT)
  }
}
