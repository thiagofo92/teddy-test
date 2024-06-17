export class LoginAuthorizedError extends Error {
  constructor() {
    super()
    this.name = 'LoginAuthorized'
    this.message = 'Unauthorized - wrong login or pass'
  }
}

export class LoginAlreadyExistError extends Error {
  constructor() {
    super()
    this.name = 'LoginAlreadyExist'
    this.message = 'Email already registered'
  }
}
