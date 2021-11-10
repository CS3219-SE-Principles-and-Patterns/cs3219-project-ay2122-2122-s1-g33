# PeerProgram - Running On Local Instructions

## 1) Clone the repository

git clone https://github.com/CS3219-SE-Principles-and-Patterns/cs3219-project-ay2122-2122-s1-g33.git 

## 2) Install the node module dependencies for each component

Go into each of the directories: `/Docs`, `/Frontend` and `/Sessions`, and run the following command:

```console
npm install
```

## 3) Use Environment Files

Access the environment variables for the Docs, Frontend and Sessions services from this secret gist: https://gist.github.com/Davidcwh/10de3c44ec111c2a59505cd436829659

For each of the services, create a `.env` file in their diretories (`/Docs`, `/Frontend` and `/Sessions`) and copy over the respective environment variables from the secret gist above.

## 4 Download TLS Secrets

Go to this dropbox link: https://www.dropbox.com/sh/5xkh3k1z9i0iuq5/AAAiI9bv5ruRR1aHoDGgiso2a?dl=0

Click "download" and unzip the downloaded zip file to get the `tls-secrets` folder. Move the `tls-secrets` folder to the repository root directory.

## 4) Start the Code Executor service

Go to the directory: `/Code Executor/`

Run the command: 

```console
docker-compose up
```

## 5) Start the Frontend, Docs and Sessions services

Open 3 different terminals, navigate each terminal to the `/Docs`, `/Frontend` and `/Sessions` directories. Run the following command in each terminal:

```console
npm start
```

## 6) Access the Frontend

 Open an internet browser of your choice and go to http://localhost:3000/ to access the frontend client.
