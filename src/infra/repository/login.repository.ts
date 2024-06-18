import { LoginEntity } from "@/core/entity";
import { Either, left, right } from "@/shared/error";
import { LoginRepositoryPort } from "./port";
import { PrismaConnect } from "./prisma.repository";
import { randomUUID } from "crypto";
import bcrypt from 'bcrypt'
import { Injectable } from "@nestjs/common";
import { LoginAlreadyExistError, LoginAuthorizedError } from "@/shared/error/login.error";
import { InternalServerError, NotFoundError } from "@/shared/error/general.error";
import { LoginDtoOutPut } from "@/app/dto";

@Injectable()
export class LoginRepository implements LoginRepositoryPort {
  constructor(private readonly conn: PrismaConnect) { }
  async create(input: LoginEntity): Promise<Either<Error, { id: string; }>> {
    try {
      const salt = await bcrypt.genSalt()
      const pass = await bcrypt.hash(input.pass, salt)

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

      console.log(error)
      return left(new InternalServerError())
    }
  }

  async auth(email: string, pass: string): Promise<Either<LoginAuthorizedError | InternalServerError, boolean>> {
    try {
      const result = await this.conn.login.findUnique({ where: { email } })

      if (!result) return left(new LoginAuthorizedError())

      const auth = await bcrypt.compare(pass, result.pass)

      if (!auth) return left(new LoginAuthorizedError())
      return right(true)
    } catch (error) {
      console.log(error)
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
      console.log(error)
      return left(new InternalServerError())
    }
  }
}
