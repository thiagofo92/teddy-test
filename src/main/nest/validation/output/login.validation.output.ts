import { ApiProperty } from "@nestjs/swagger";

export class LoginValidationCreateOutput {
  @ApiProperty()
  id: string
}


export class LoginValidationAuthOutput {
  @ApiProperty()
  token: string
}
