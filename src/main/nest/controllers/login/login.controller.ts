import { HTTP_CODE_UTIL } from '@/util/http-code.util';
import { Controller, Post, HttpCode, Body, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginValidationAuthInput, LoginValidationCreateInput } from '../../validation';
import { LoginUseCasePort } from '@/app/usecase/port';
import { JwtService } from '@nestjs/jwt';
import { LoginValidationAuthOutput, LoginValidationCreateOutput } from '../../validation/output/login.validation.output';

@ApiTags('Login')
@Controller('/v1/logins')
export class LoginController {
  constructor(private readonly usecase: LoginUseCasePort, private readonly jwt: JwtService) { }

  @Post()
  @HttpCode(HTTP_CODE_UTIL.CREATED)
  @ApiCreatedResponse({ type: LoginValidationCreateOutput })
  @ApiInternalServerErrorResponse()
  async create(@Body() input: LoginValidationCreateInput, @Res() res: Response) {
    const result = await this.usecase.create(input)
    res.status(result.code).json(result.data)
  }

  @Post('/auth')
  @HttpCode(HTTP_CODE_UTIL.CREATED)
  @ApiOkResponse({ type: LoginValidationAuthOutput })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async auth(@Body() input: LoginValidationAuthInput, @Res() res: Response) {
    const result = await this.usecase.auth(input.email, input.pass)

    res.status(result.code).json(result.data)
  }
}
