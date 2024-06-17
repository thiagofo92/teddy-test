export class ShortUrlError extends Error {
  constructor() {
    super()
    this.name = 'ShortUrlError'
    this.message = 'Invalid url'
  }
}
