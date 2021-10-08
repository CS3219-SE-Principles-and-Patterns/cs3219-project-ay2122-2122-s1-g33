FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# node_modules will not be copied as it is already added to .dockerignore
COPY . .
RUN npm install
# RUN apk add --update python
# Cannot use apt-get if we are using Alpine Linux Distribution, not Ubuntu-based distros
RUN apt-get install -y python 
# RUN apt-get install python-is-python3
CMD ["npm", "start"]
EXPOSE 3000