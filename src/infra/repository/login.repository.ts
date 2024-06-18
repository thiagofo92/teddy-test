import { LoginEntity } from "@/core/entity";
import { Either, left, right } from "@/shared/error";
import { LoginRepositoryPort } from "./port";
import { PrismaConnect } from "./prisma.repository";
import { randomUUID } from "crypto";
import { genSalt, hash, compare } from 'bcrypt'
import { LoginAlreadyExistError, LoginAuthorizedError } from "@/shared/error/login.error";
import { InternalServerError, NotFoundError } from "@/shared/error/general.error";
import { LoginDtoOutPut } from "@/app/dto";
import { Logger } from "@/shared";

export class LoginRepository implements LoginRepositoryPort {
  constructor(private readonly conn: PrismaConnect) { }
  async create(input: LoginEntity): Promise<Either<Error, { id: string; }>> {
    try {
      const salt = await genSalt(10)
      const pass = await hash(input.pass, salt)

      const result = await this.conn.login.create({
        data: {
          uuid: randomUUID(),
          email: input.email,
          pass,
          salt
        }
      })

      return right({ id: result.uuid })
    } catch (error) {
      if (error.code == 'P2002') return left(new LoginAlreadyExistError())

      Logger.error(error.message || error.name)
      return left(new InternalServerError())
    }
  }

  async auth(email: string, pass: string): Promise<Either<LoginAuthorizedError | InternalServerError, { id: string }>> {
    try {
      const result = await this.conn.login.findUnique({ where: { email } })

      if (!result) return left(new LoginAuthorizedError())

      const auth = await compare(pass, result.pass)

      if (!auth) return left(new LoginAuthorizedError())
      return right({ id: result.uuid })
    } catch (error) {
      Logger.error(error.message || error.name)
      return left(new InternalServerError())
    }
  }

  async findByUUID(uuid: string): Promise<Either<LoginAuthorizedError | InternalServerError, LoginDtoOutPut>> {
    try {
      const result = await this.conn.login.findFirst({ where: { uuid } })


      if (!result) return left(new NotFoundError())

      return right({
        id: result.id,
        email: result.email
      })
    } catch (error) {
      Logger.error(error.message || error.name)
      return left(new InternalServerError())
    }
  }
}
