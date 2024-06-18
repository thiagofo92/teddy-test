export interface ShortUrlDtoInput {
  url: string,
  userUUID?: string
  userId?: number
}

export interface ShortUrlUpdateDtoInput {
  id: number
  url: string,
}
