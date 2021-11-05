FROM node:17.0.1-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# latest yarn
RUN npm i -g --force yarn serve

COPY package.json yarn.lock .

RUN yarn --frozen-lockfile

# Legacy docker settings cos node 17 breaks build
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "prod"]
