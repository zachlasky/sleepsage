package endpointshelpers

import (
	"database/sql"
	dbqueries "sss/db/queries"
	"sss/shared"
)

func CreateUserInfoEntry(dbConnection *sql.DB, userInfoRequestData shared.UserInfoRequestData) error {
	userInfo := shared.UserInfo{
		UserId:               userInfoRequestData.UserId,
		Age:                  "",
		Gender:               "",
		Weight:               "",
		SavedSupplements:     []string{},
		SavedProducts:        []string{},
		SuggestedSupplements: []string{},
		SuggestedProducts:    []string{},
		Interactions:         []string{},
		Risks:                []string{},
		Symptoms:             []string{},
	}

	// If a product id was sent, add it to the saved products
	if userInfoRequestData.ProductId != "" {
		userInfo.SavedProducts = []string{userInfoRequestData.ProductId}
	}

	// If a supplement id was sent, add it to the saved supplements
	if userInfoRequestData.SupplementId != "" {
		userInfo.SavedSupplements = []string{userInfoRequestData.SupplementId}
	}

	// If a submission id was sent, grab the submission data associated with the submissionId
	if userInfoRequestData.SubmissionId != "" {
		submission, err := dbqueries.QueryGetSubmissionById(dbConnection, userInfoRequestData.SubmissionId)
		if err != nil {
			return err
		}

		userInfo.Age = submission.Age
		userInfo.Gender = submission.Gender
		userInfo.Weight = submission.Weight
		userInfo.SuggestedSupplements = submission.SuggestedSupplements
		userInfo.SuggestedProducts = submission.SuggestedProducts
		userInfo.Interactions = submission.Interactions
		userInfo.Risks = submission.Risks
		userInfo.Symptoms = submission.Symptoms
	}

	_, error := dbqueries.QueryCreateUserInfoEntry(dbConnection, userInfo)
	if error != nil {
		return error
	}

	return nil
}

func UpdateUserInfo(dbConnection *sql.DB, userId string, userInfoUpdateData shared.UserInfoUpdateData) error {
	if userInfoUpdateData.SupplementId == "" && userInfoUpdateData.ProductId == "" {
		return nil // Nothing to update
	}

	// Update the saved supplements if a supplement id was provided
	if userInfoUpdateData.SupplementId != "" {
		error := dbqueries.QueryUpdateUserInfoSavedSupplements(dbConnection, userId, userInfoUpdateData.SupplementId)
		if error != nil {
			return error
		}

		return nil
	}

	// Update the saved products if a product id was provided
	error := dbqueries.QueryUpdateUserInfoSavedProducts(dbConnection, userId, userInfoUpdateData.ProductId)
	if error != nil {
		return error
	}

	return nil
}
