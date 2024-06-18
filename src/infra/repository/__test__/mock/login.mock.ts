import { LoginEntity } from "@/core/entity"
import { faker } from '@faker-js/faker'

type LoginMockType = {
  main: {
    id: number,
    entity: LoginEntity
  }
  exist: {
    id: number,
    entity: LoginEntity
  }
}

export const LoginMock: LoginMockType = {
  main: {
    id: 1,
    entity: {
      email: faker.internet.email(),
      pass: faker.internet.password()
    }
  },
  exist: {
    id: 2,
    entity: {
      email: 'exist@exist.com.br',
      pass: faker.internet.password()
    }
  }
}
