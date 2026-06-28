package api

import (
	"database/sql"
	"net/http"
	"sss/endpoints"
)

func getEndpoints(mux *http.ServeMux, dbConnection *sql.DB) {
	// User Info
	mux.HandleFunc("POST /user-info", endpoints.PostUser(dbConnection))             // Creates a user in UserInfo database table
	mux.HandleFunc("PATCH /user-info/{userId}", endpoints.UpdateUser(dbConnection)) // Updates user info in UserInfo database table

	// Quiz
	mux.HandleFunc("GET /quiz-results", endpoints.GetQuizResults(dbConnection)) // Gets quiz results
	mux.HandleFunc("GET /quiz", endpoints.GetQuiz(dbConnection))                // Gets the quiz questions and answers
	mux.HandleFunc("POST /quiz", endpoints.PostQuiz(dbConnection))              // Creates a quiz submission in the Submission database table

	// Supplements
	mux.HandleFunc("GET /supplements", endpoints.GetSupplements(dbConnection)) // Gets a list of supplements

	// Products
	mux.HandleFunc("GET /products", endpoints.GetProducts(dbConnection))                    // Gets a list of products
	mux.HandleFunc("GET /product-categories", endpoints.GetProductCategories(dbConnection)) // Gets a list of product categories

	// Interactions, Risks, Symptoms
	mux.HandleFunc("GET /interactions-risks-symptoms", endpoints.GetInteractionsRisksSymptoms(dbConnection)) // gets interactions, risks, and symptoms
}
