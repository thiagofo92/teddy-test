import { LoginEntity } from "@/core/entity"
import { faker } from '@faker-js/faker'

type LoginMockType = {
  main: LoginEntity
  exist: LoginEntity
}

export const LoginMock: LoginMockType = {
  main: {
    email: faker.internet.email(),
    pass: faker.internet.password()
  },
  exist: {
    email: 'exist@exist.com.br',
    pass: faker.internet.password()
  }
}
