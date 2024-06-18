# API Teddy

## Descrição

API permite que o usuário gere path da URL com o tamanho de 6 caracteres, o usuário também pode fazer um cadastro para visualizar suas usuários criadas, quantidade de acessos e atualizar a URL de redirecionamento.

## Detalhes de como montar o ambiente

* Instalar o Node JS caso não tenha, [Node JS link](https://nodejs.org/en/download/package-manager/)
* Versão do Node JS utilizada: 20.14.0
* Pode ser usado o NPM,YARN ou PNPM para gerenciar o node_modules ( Recomendo usar o pnpm para instalar os pacotes com a mesma versão do pnpm-lock.yaml)
* Instalar o Docker [Docker link](https://docs.docker.com/desktop/install/windows-install/)
* Instalar o Docker composer [Docker Compose Link](https://docs.docker.com/compose/install/)
* Renomei o arquivo .env.git para .env
* Efetue a instalação do **node_modules** usando **npm install**, **yarn**, **pnpm i**
* Execute o comando **npm run build**, **yarn build** ou **pnpm run buil** para criar o a pasta **dist**, será a pasta de produção
* Descompacte a pasta do database.zip para gerar os dados do banco de dados
* Executar o comando **docker-compose up -d** para criar o container com o Docker

## Executar testes

* Necessário o banco de dados estar sendo executado 
* Execute o commando **npx run test**, **yarn test** ou **pnpm run test** para verificar se está tudo funcionando
* O projeto contém um json do postman, aleḿ do swagger

## Detalhes sobre a API

* A Api possui uma rota para acessar a documentação do swagger http://servidor:porta/doc
* Respostas de Sucesso
  * true
  * Status Code 201 sucesso
* Respostas de Erro
  * messagem(String)
  * Status Code 404 (conteúdo não encontrado)
  * Status Code 401 (Usuário não autorizado)
  * Status Code 400 (parâmetros faltando)
  * Status Code 500 para erro interno

## Pacotes principais

* NestJS
* Prisma
* Winston
* @nestjs/jwt
* vitest

## Estrura base do projeto

* A **main** dentro da **src** inicia o servidor
* A pasta **infra** contém as aplicações de terceiros
* A pasta **core** contém as regras de negócio
* A pasta **app** contém as regras da aplicação, como o gerenciamento de quais classes vão ser chamadas e formatação de dados
* A pasta **shared** contém os arquivos que são acessado por várias pastas

## Informações sobre o projeto

* Arquitetura base - [Port and Adapter](https://alistair.cockburn.us/hexagonal-architecture/)
* Tratativas de erros - [Either Error](https://blog.logrocket.com/javascript-either-monad-error-handling/)
* DIP - [Dependency inversion principle](https://medium.com/@tbaragao/solid-d-i-p-dependency-inversion-principle-e87527f8d0be)