import 'dotenv/config'
import { Either, left, right } from "@/shared/error";
import { ShortUrlError } from "@/shared/error/short-url.error";

export class ShortUrlEntity {
  private WORDS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  private shortedUrl: string

  constructor(readonly url: string, private count = 1, readonly userId: number = null) { }
  execute(): Either<ShortUrlError, string> {
    try {
      new URL(this.url)
      this.shortedUrl = this.generateUrl()
      return right(this.shortedUrl)
    } catch (error) {
      return left(new ShortUrlError())
    }
  }

  private generateUrl(): string {
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += this.WORDS.charAt(Math.floor(Math.random() * this.WORDS.length));
    }
    return result
  }

  updateCount() {
    this.count++
  }

  getCount() {
    return this.count
  }

  getDomainShorted() {
    const domain = process.env.SERVER_DOMAIN || 'http://localhost:3500'
    return `${domain}/${this.shortedUrl}`
  }

  getShortedUrl() {
    return this.shortedUrl
  }
}
