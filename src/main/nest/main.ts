import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())

  const config = new DocumentBuilder()
    .setTitle('API Teddy')
    .setDescription(`API para encuratar URL, a mesma permite que criar um novo usuário ou criar novas urls sem usuários.
      Usando um usuário logado, toda nova URL é atrelada ao usuário, e o mesmo terá acesso a editar e listar as suas URLs. 
      `)
    .setVersion('0.1.0')
    .addBearerAuth()
    .build()

  const port = Number(process.env.SERVER_PORT) || 3500
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(port);
}
