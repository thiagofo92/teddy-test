import { LoginEntity } from "@/core/entity"
import { Either } from "@/shared/error"
import { InternalServerError } from "@/shared/error/general.error"
import { LoginAlreadyExistError, LoginAuthorizedError } from "@/shared/error/login.error"

type LoginCreated = { id: string }

export abstract class LoginRepositoryPort {
  create: (input: LoginEntity) => Promise<Either<LoginAlreadyExistError | InternalServerError, LoginCreated>>
  auth: (emai: string, pass: string) => Promise<Either<LoginAuthorizedError | InternalServerError, boolean>>
}
