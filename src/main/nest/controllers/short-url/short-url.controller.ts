import { ShortUrlUseCasePort } from '@/app/usecase/port';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ShortUrlValidationCreateInput, ShortUrlValidationUpdateInput } from '../../validation';
import { ShorUrlValidationFindAllOutput, ShortUrlValidationOutput, ShortUrlValidationShortedUrlOutput } from '../../validation/output/short-url.validation.output';
import { AuthGuard } from '../../guard/auth.guard.jwt';
import { Request, Response } from 'express';
import { SkipAuth } from '../../guard/decorator/skip-auth.decorator';
import { UserContext } from '../@types/user.type.context';

@Controller('/v1/short-url')
@ApiTags('Short Url')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ShortUrlController {
  constructor(private readonly usecase: ShortUrlUseCasePort) { }

  @Post()
  @ApiCreatedResponse({ type: ShortUrlValidationOutput, description: `Essa rota permite criar URLs encurtadas, o processo pode ser feito com login ou sem.
    Caso crio uma nova URL logado, a mesma será atrelada ao seu login,
    Caso crie sem estar logado, a nova url será salva no banco sem usuário 
    ` })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @SkipAuth()
  async create(@Body() input: ShortUrlValidationCreateInput, @Req() req: Request, @Res() res: Response) {
    const data = req['user'] as UserContext | null

    const result = await this.usecase.create({ url: input.url, userUUID: data?.sub.userId })

    res.status(result.code).json(result.data)
  }


  @Put(':id')
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async update(@Param('id', ParseIntPipe) id: number, @Body() input: ShortUrlValidationUpdateInput, @Res() res: Response) {
    const result = await this.usecase.update({ id, url: input.url })

    res.status(result.code).json(result.data)
  }

  @Get()
  @ApiOkResponse({ type: ShorUrlValidationFindAllOutput, isArray: true })
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiInternalServerErrorResponse()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const { sub } = req['user'] as UserContext
    const result = await this.usecase.findAll(sub.userId)
    res.status(result.code).json(result.data)
  }

  @SkipAuth()
  @Get('/short/:url')
  @ApiOkResponse({ type: ShortUrlValidationShortedUrlOutput })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async findByShortedUrl(@Param('url') url: string, @Res() res: Response) {
    const result = await this.usecase.findByUrlShorted(url)

    if (result.code > 199 && result.code < 300) return res.redirect(result.data)

    res.status(result.code).json(result.data)
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.usecase.delete(id)
    res.status(result.code).json(result.data)
  }
}
