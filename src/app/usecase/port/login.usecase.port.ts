import { LoginDtoInput } from "@/app/dto/input"
import { ResponseFormated } from "@/util/response.util"

export abstract class LoginUseCasePort {
  create: (input: LoginDtoInput) => Promise<ResponseFormated>
  auth: (email: string, pass: string) => Promise<ResponseFormated>
}
