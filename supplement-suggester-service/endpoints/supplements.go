package endpoints

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
	endpointshelpers "sss/endpoints/helpers"
	"sss/shared"
)

func GetSupplements(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the query parameters
		r.ParseForm()

		// Get all query parameters
		interactions := r.Form["interaction"]
		risks := r.Form["risk"]
		symptoms := r.Form["symptom"]

		interactionsRisksSymptoms := shared.InteractionsRisksSymptoms{
			Interactions: interactions,
			Risks:        risks,
			Symptoms:     symptoms,
		}

		// Get ingredients from the database
		ingredients, err := endpointshelpers.GetIngredients(dbConnection, interactionsRisksSymptoms)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Get matching supplements from the database
		supplements, err := endpointshelpers.GetSupplements(dbConnection, ingredients)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		supplementResults := []shared.Supplement{}
		for _, supplement := range supplements {
			supplementResults = append(supplementResults, shared.Supplement{
				Id:         supplement.Id,
				Name:       supplement.Name,
				Definition: supplement.Definition,
				ImageUrl:   supplement.ImageUrl,
				LinkUrl:    supplement.LinkUrl,
			})
		}

		// Sort supplements alphabetically by Name
		sort.Slice(supplementResults, func(i, j int) bool {
			return supplementResults[i].Name < supplementResults[j].Name
		})

		// Return the supplements as a JSON response
		err = json.NewEncoder(w).Encode(supplementResults)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
