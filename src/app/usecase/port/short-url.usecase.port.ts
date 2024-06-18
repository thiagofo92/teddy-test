import { ShortUrlDtoInput, ShortUrlUpdateDtoInput } from "@/app/dto";
import { ResponseFormated } from "@/util/response.util";

export abstract class ShortUrlUseCasePort {
  create: (input: ShortUrlDtoInput) => Promise<ResponseFormated>
  update: (input: ShortUrlUpdateDtoInput) => Promise<ResponseFormated>
  findAll: (userId: string) => Promise<ResponseFormated>
  findByUrlShorted: (url: string) => Promise<ResponseFormated>
  delete: (id: number) => Promise<ResponseFormated>
}
