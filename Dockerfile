FROM node:20.14.0

WORKDIR /api 
RUN mkdir prisma
COPY ./dist /api/
COPY ./prisma/schema.prisma ./prisma
COPY ./package.json /api/
COPY ./pm2-config.json ./pnpm-lock.yaml /api/

ENV DATABASE_URL='mysql://root:12344321@db:3306/teddy?schema=public'

RUN npm i -g pnpm && npm install pm2@5.4.1 -g
RUN pnpm i --frozen-lockfile
# RUN pnpm exec prisma migrate dev --name init

ENTRYPOINT ["pm2-runtime", "pm2-config.json"]
# CMD ["tail", "-f", "/dev/null"]
