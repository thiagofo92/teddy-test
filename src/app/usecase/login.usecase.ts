import { LoginUseCasePort } from "./port";
import { LoginDtoInput } from "../dto/input";
import { ResponseFormated, responseData, responseError } from "@/util/response.util";
import { LoginRepositoryPort } from "@/infra/repository/port";
import { LoginEntity } from "@/core/entity";
import { HTTP_CODE_UTIL } from "@/util/http-code.util";
import { JwtService } from "@nestjs/jwt";

export class LoginUseCase implements LoginUseCasePort {
  private secretJwt = process.env.JWT_SECRET
  constructor(private readonly rp: LoginRepositoryPort, private readonly jwt: JwtService) { }
  async create<T = any>(input: LoginDtoInput): Promise<ResponseFormated<T>> {
    const entity: LoginEntity = {
      email: input.email,
      pass: input.pass
    }
    const result = await this.rp.create(entity)

    if (result.isLeft()) {
      return responseError(result.value)
    }
    return responseData(result.value, HTTP_CODE_UTIL.CREATED)
  }

  async auth<T = any>(email: string, pass: string): Promise<ResponseFormated<T>> {
    const result = await this.rp.auth(email, pass)

    if (result.isLeft()) {
      return responseError(result.value)
    }

    const payload = { sub: { userId: result.value.id } }

    const token = await this.jwt.signAsync(payload, { secret: this.secretJwt, expiresIn: '1min' })

    return responseData({ token }, HTTP_CODE_UTIL.OK)
  }
}
