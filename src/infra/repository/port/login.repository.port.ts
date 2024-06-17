import { LoginEntity } from "@/core/entity"
import { Either } from "@/shared/error"

type LoginCreated = { id: string }

export abstract class LoginRepositoryPort {
  create: (input: LoginEntity) => Promise<Either<Error, LoginCreated>>
  auth: (emai: string, pass: string) => Promise<Either<Error, boolean>>
}
