FROM node:17.0.1-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production

EXPOSE 3003

CMD ["npm", "start"]
