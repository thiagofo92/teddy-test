import { ShortUrlDtoInput, ShortUrlUpdateDtoInput } from "@/app/dto";
import { ResponseFormated } from "@/util/response.util";

export abstract class ShortUrlUseCasePor {
  create: (input: ShortUrlDtoInput) => Promise<ResponseFormated>
  update: (id: number, input: ShortUrlUpdateDtoInput) => Promise<ResponseFormated>
  findAll: (userId: string) => Promise<ResponseFormated>
  findByUrlShorted: (url: string) => Promise<ResponseFormated>
}
