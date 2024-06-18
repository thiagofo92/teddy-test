import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Min } from 'class-validator'
export class LoginValidationCreateInput {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @Length(6, 16)
  pass: string
}


export class LoginValidationAuthInput {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  pass: string
}
