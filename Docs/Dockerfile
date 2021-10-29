FROM node:17.0.1-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV NODE_ENV=production

EXPOSE 3003

CMD ["npm", "start"]
