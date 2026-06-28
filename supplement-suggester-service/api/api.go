package api

import (
	"log"
	"net/http"
	"os"
	"sss/db"

	"github.com/gorilla/handlers"
	_ "github.com/lib/pq" // Postgres driver
)

func StartServer() {
	// Connect to the database
	dbConnection, err := db.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	// Prime the endpoints
	mux := http.NewServeMux()
	getEndpoints(mux, dbConnection)

	// Get the port from the environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the server
	err = http.ListenAndServe(":"+port, handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PATCH"}),
		handlers.AllowedHeaders([]string{"Content-Type"}),
	)(mux))
	if err != nil {
		log.Fatal(err)
	}
}
