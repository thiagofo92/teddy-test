import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class ShortUrlValidationCreateInput {
  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string
}


export class ShortUrlValidationUpdateInput {
  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string
}

