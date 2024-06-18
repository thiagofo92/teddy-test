import { describe, expect, test } from 'vitest'
import { ShortUrlEntity } from '../short-url.entity'
import { Right } from '@/shared/error'
import { ShortUrlError } from '@/shared/error/short-url.error'

describe('# Short ULR Entity - Unit', () => {
  test('Execute - [SUCCESS] - "Create a shorted url"', () => {
    const short = new ShortUrlEntity('http://localhost/test/unit')
    const output = short.execute() as Right<Error, string>
    const u = new URL(output.value)
    expect(output.value).toBeTypeOf('string')
    expect(u.pathname).toHaveLength(6)
  })
  test('Execute - [ERROR] - "Invalid URL"', () => {
    const short = new ShortUrlEntity('localhost/test/unit')
    const output = short.execute() as Right<Error, string>
    expect(output.value).toBeInstanceOf(ShortUrlError)
  })
  test('Execute - [SUCCESS] - "Update the count of access"', () => {
    const short = new ShortUrlEntity('http://localhost/test/unit')
    short.updateCount()
    expect(short.getCount()).toStrictEqual(2)
  })
})
