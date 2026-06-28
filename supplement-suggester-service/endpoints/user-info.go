package endpoints

import (
	"database/sql"
	"encoding/json"
	"net/http"
	endpointshelpers "sss/endpoints/helpers"
	"sss/shared"
)

func PostUser(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var postUserInfoRequest shared.UserInfoRequestData

		// Read the body, parse the JSON, and store the data in the quizRequestData variable
		err := json.NewDecoder(r.Body).Decode(&postUserInfoRequest)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Create a submission in the database
		err = endpointshelpers.CreateUserInfoEntry(dbConnection, postUserInfoRequest)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return a 200 OK status with no body
		w.WriteHeader(http.StatusOK)
	}
}

func UpdateUser(dbConnection *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Extract userId from URL
		userId := r.PathValue("userId")

		// Validate if userId is present
		if userId == "" {
			http.Error(w, "Missing user ID", http.StatusBadRequest)
			return
		}

		var patchUserInfoRequest shared.UserInfoUpdateData

		// Read the body, parse the JSON, and store the data in the quizRequestData variable
		err := json.NewDecoder(r.Body).Decode(&patchUserInfoRequest)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Update the user info in the database
		err = endpointshelpers.UpdateUserInfo(dbConnection, userId, patchUserInfoRequest)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Return a 200 OK status with no body
		w.WriteHeader(http.StatusOK)
	}
}
