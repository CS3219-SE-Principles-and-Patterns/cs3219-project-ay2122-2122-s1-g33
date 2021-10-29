FROM node:17.0.1-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# latest yarn
RUN npm i -g --force yarn serve

COPY . .

RUN yarn

RUN yarn build

WORKDIR /usr/src/app/build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["serve", "-l", "3000"]
