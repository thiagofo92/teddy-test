import { ApiProperty } from "@nestjs/swagger";

export class ShortUrlValidationOutput {
  @ApiProperty()
  url: string
}

export class ShortUrlValidationShortedUrlOutput {
  @ApiProperty()
  url: string
}

export class ShorUrlValidationFindAllOutput {
  @ApiProperty()
  id: number

  @ApiProperty()
  url: string

  @ApiProperty()
  urlShorted: string

  @ApiProperty()
  lastUpdateCount: string

  @ApiProperty()
  lastUpdateUrl: string
}
