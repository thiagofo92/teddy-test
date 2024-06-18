import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '15min' },
    }),
  ],
})
export class AuthModule { }
