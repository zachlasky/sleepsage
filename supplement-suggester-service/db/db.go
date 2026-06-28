package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq" // Postgres driver
)

func ConnectDB() (*sql.DB, error) {
	// Get the connection string from the environment
	// TODO Use Supasbase Direct Connection string instead of Session Pooler string when deploying on a server
	connectionString := os.Getenv("DATABASE_URL")

	// Open the connection
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	// Test the connection
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return db, nil
}
