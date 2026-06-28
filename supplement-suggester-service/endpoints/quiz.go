package endpoints

import (
	"database/sql"
	"encoding/json"
	"net/http"
	endpointshelpers "sss/endpoints/helpers"
	"sss/shared"
)

type PostQuizResponse struct {
	Supplements  []string
	Products     []string
	SubmissionId string
}

func PostQuiz(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var quizRequestData []shared.QuizRequestQuestion

		// Read the body, parse the JSON, and store the data in the quizRequestData variable
		err := json.NewDecoder(r.Body).Decode(&quizRequestData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Match the user-submitted answers with the categories
		categoryAnswers, err := endpointshelpers.GetCategoryAnswers(dbConnection, quizRequestData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		interactionsRisksSymptoms := shared.InteractionsRisksSymptoms{
			Interactions: categoryAnswers.Interactions,
			Risks:        categoryAnswers.Risks,
			Symptoms:     categoryAnswers.Symptoms,
		}

		// Get ingredients from the database
		ingredients, err := endpointshelpers.GetIngredients(dbConnection, interactionsRisksSymptoms)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Get products from the database
		products, err := endpointshelpers.GetProducts(dbConnection, []string{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		productIds := []string{}
		for _, product := range products {
			productIds = append(productIds, product.Id)
		}

		// Use only first 3 productIds from the database
		productSlice := 3
		if len(productIds) < productSlice {
			productSlice = len(productIds) // Avoid out-of-bounds error
		}

		// Get matching supplements from the database
		supplements, err := endpointshelpers.GetSupplements(dbConnection, ingredients)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		supplementIds := []string{}
		for _, supplement := range supplements {
			supplementIds = append(supplementIds, supplement.Id)
		}

		// Use only first 3 supplementIds from the database
		supplementSlice := 3
		if len(supplementIds) < supplementSlice {
			supplementSlice = len(supplementIds) // Avoid out-of-bounds error
		}

		submission := shared.Submission{
			Age:                  categoryAnswers.Age,
			Gender:               categoryAnswers.Gender,
			Weight:               categoryAnswers.Weight,
			Interactions:         categoryAnswers.Interactions,
			Risks:                categoryAnswers.Risks,
			Symptoms:             categoryAnswers.Symptoms,
			SuggestedSupplements: supplementIds[:supplementSlice],
			SuggestedProducts:    productIds[:productSlice],
		}

		// Create a quiz submission in the database
		submissionId, err := endpointshelpers.CreateQuizSubmission(dbConnection, submission)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		response := PostQuizResponse{
			Supplements:  supplementIds[:supplementSlice],
			Products:     productIds[:productSlice],
			SubmissionId: submissionId,
		}

		// Return the response as a JSON response
		err = json.NewEncoder(w).Encode(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func GetQuiz(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get questions from the database
		questionsAndAnswers, err := endpointshelpers.GetQuiz(dbConnection)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return the questions as a JSON response
		err = json.NewEncoder(w).Encode(questionsAndAnswers)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func GetQuizResults(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var supplementIds []string
		var productIds []string

		// Parse the query parameters
		r.ParseForm()

		// Get all 'supplements' query parameters and append to supplementIds
		supplements := r.Form["supplement"]
		supplementIds = append(supplementIds, supplements...)

		// Get all 'products' query parameters and append to productIds
		products := r.Form["product"]
		productIds = append(productIds, products...)

		// Send only first 3 productIds to query the database
		productSlice := 3
		if len(productIds) < productSlice {
			productSlice = len(productIds) // Avoid out-of-bounds error
		}

		// Send only first 3 supplementIds to query the database
		supplementSlice := 3
		if len(supplementIds) < supplementSlice {
			supplementSlice = len(supplementIds) // Avoid out-of-bounds error
		}

		quizResults, err := endpointshelpers.GetQuizResults(dbConnection, supplementIds[:supplementSlice], productIds[:productSlice])
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return the quiz results as a JSON response
		err = json.NewEncoder(w).Encode(quizResults)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
