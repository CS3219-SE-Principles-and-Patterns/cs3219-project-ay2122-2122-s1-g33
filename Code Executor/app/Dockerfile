# FROM node:14
FROM nikolaik/python-nodejs:python3.10-nodejs17-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .
# RUN apk add --update python
# Cannot use apt-get if we are using Alpine Linux Distribution, not Ubuntu-based distros
# RUN apt-get install -y python 
# RUN apt-get install python-is-python3
CMD ["npm", "start"]
EXPOSE 8080