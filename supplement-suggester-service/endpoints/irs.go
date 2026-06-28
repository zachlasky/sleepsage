package endpoints

import (
	"database/sql"
	"encoding/json"
	"net/http"
	endpointshelpers "sss/endpoints/helpers"
)

func GetInteractionsRisksSymptoms(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get interactions, risks, and symptoms from the database
		interactionsRisksSymptoms, err := endpointshelpers.GetInteractionsRisksSymptoms(dbConnection)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return the interactions, risks, and symptoms as a JSON response
		err = json.NewEncoder(w).Encode(interactionsRisksSymptoms)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
