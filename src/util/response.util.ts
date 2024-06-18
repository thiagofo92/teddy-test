import { NotContent, NotFoundError } from "@/shared/error/general.error"
import { LoginAlreadyExistError, LoginAuthorizedError } from "@/shared/error/login.error"
import { HTTP_CODE_UTIL } from "./http-code.util"

export interface ResponseFormated<T = any> {
  data: T,
  code: number
}
export function responseData(data: any, code: number): ResponseFormated {
  return {
    data,
    code
  }
}

export function responseError(error: Error): ResponseFormated {
  if (error instanceof LoginAuthorizedError) return responseData({ message: error.message }, HTTP_CODE_UTIL.UNAUTHORIZED)
  if (error instanceof LoginAlreadyExistError) return responseData({ message: error.message }, HTTP_CODE_UTIL.BAD_REQUEST)
  if (error instanceof NotFoundError) return responseData({ message: error.message }, HTTP_CODE_UTIL.NOT_FOUND)
  if (error instanceof NotContent) return responseData({ message: error.message }, HTTP_CODE_UTIL.NO_CONTENT)
  return {
    data: {
      message: 'Internal server error',
    },
    code: 500
  }
}
