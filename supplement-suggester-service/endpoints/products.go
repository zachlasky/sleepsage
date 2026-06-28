package endpoints

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
	endpointshelpers "sss/endpoints/helpers"
)

func GetProducts(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the query parameters
		r.ParseForm()

		// Get all query parameters
		categories := r.Form["category"]

		// Get products from the database
		products, err := endpointshelpers.GetProducts(dbConnection, categories)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Sort products alphabetically by Name
		sort.Slice(products, func(i, j int) bool {
			return products[i].Name < products[j].Name
		})

		// Return the products as a JSON response
		err = json.NewEncoder(w).Encode(products)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func GetProductCategories(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get product categories from the database
		categories, err := endpointshelpers.GetProductCategories(dbConnection)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return the product categories as a JSON response
		err = json.NewEncoder(w).Encode(categories)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
