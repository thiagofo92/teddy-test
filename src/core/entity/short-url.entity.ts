import 'dotenv/config'
import { Either, left, right } from "@/shared/error";
import { ShortUrlError } from "@/shared/error/short-url.error";

export class ShortUrlEntity {
  private WORDS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  private shortedUrl: string

  constructor(readonly url: string, private count = 1) { }
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
    for (let i = 0; i < 5; i++) {
      result += this.WORDS.charAt(Math.floor(Math.random() * this.WORDS.length));
    }
    const domain = process.env.SERVER_DOMAIN || 'http://localhost:3500'
    return `${domain}/${result}`
  }

  updateCount() {
    this.count++
  }

  getCount() {
    return this.count
  }

  getShortedUrl() {
    return this.shortedUrl
  }
}
