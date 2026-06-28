# supplement-suggester-service

This is the API service for the Supplement Suggester.

## Clone the repository

`git clone git@github.com:sleep-sage/supplement-suggester-service.git`

## Run the server locally

`cd supplement-suggester-service`

`go run ./main.go`

## Run the server from a docker image locally

`cd supplement-suggester-service`

`docker build -t sss .`

`docker run -p 8080:8080 sss`

## Run unit tests

`cd api`

`go test`

## Connect to database

- Create a `.env` file in the root of the project
- Copy the env variables from Railway
