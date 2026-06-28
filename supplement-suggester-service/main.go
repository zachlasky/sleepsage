package main

import (
	"sss/api"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env file for local development
	godotenv.Load()

	// Start the server
	api.StartServer()
}
