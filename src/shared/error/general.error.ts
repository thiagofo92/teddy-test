export class InternalServerError extends Error {
  constructor() {
    super()
    this.name = 'InternalServerError'
    this.message = 'Internal servewr error'
  }
}

export class NotFoundError extends Error {
  constructor() {
    super()
    this.name = 'NotFoundError'
    this.message = 'ID not found'
  }
}

export class NotContent extends Error {
  constructor() {
    super()
    this.name = 'NotContent'
    this.message = 'Empty data'
  }
}
