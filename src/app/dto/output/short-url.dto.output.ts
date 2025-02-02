export type ShortUrlOutPut = {
  id: number,
  userId: number,
  urlOriginal: string,
  urlShorted: string,
  count: number,
  lastUpdateUrl: Date,
  lastUpdateCount: Date
}

export type ShortUrlFindUrl = {
  id: number,
  urlOriginal: string,
  count: number
}
