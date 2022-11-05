FROM node:18-alpine AS development
WORKDIR /usr/src/app

RUN apk update && apk add --no-cache fish curl starship gcc libc-dev libressl-dev

COPY package*.json ./

RUN npm i --only=development

COPY . .

RUN sh starship.sh

RUN npm run build

FROM node:18-alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
