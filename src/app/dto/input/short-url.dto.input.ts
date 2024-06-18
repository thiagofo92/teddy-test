export interface ShortUrlDtoInput {
  url: string,
  userId?: string
}

export interface ShortUrlUpdateDtoInput {
  id: number
  url: string,
}
