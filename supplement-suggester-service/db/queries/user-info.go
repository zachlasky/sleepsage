package dbqueries

import (
	"database/sql"
	"sss/shared"

	"github.com/lib/pq"
)

func QueryGetSubmissionById(dbConnection *sql.DB, submissionId string) (shared.Submission, error) {
	submission := shared.Submission{}

	query := `
		SELECT "Submission"."Age", "Submission"."Gender", "Submission"."Weight", "Submission"."Interactions", "Submission"."Risks", "Submission"."Symptoms", "Submission"."SuggestedSupplements", "Submission"."SuggestedProducts"
		FROM "Submission"
		WHERE "Submission"."Id" = $1
		LIMIT 1;
	`

	err := dbConnection.QueryRow(query, submissionId).Scan(
		&submission.Age,
		&submission.Gender,
		&submission.Weight,
		pq.Array(&submission.Interactions),
		pq.Array(&submission.Risks),
		pq.Array(&submission.Symptoms),
		pq.Array(&submission.SuggestedSupplements),
		pq.Array(&submission.SuggestedProducts))
	if err != nil {
		return submission, err
	}

	return submission, nil
}

func QueryCreateUserInfoEntry(dbConnection *sql.DB, user shared.UserInfo) (string, error) {
	query := `
		INSERT INTO "UserInfo" ("UserId", "Age", "Gender", "Weight", "Interactions", "Risks", "Symptoms", "SuggestedSupplements", "SuggestedProducts", "SavedSupplements", "SavedProducts")
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
		RETURNING "Id";
	`

	var id string
	err := dbConnection.QueryRow(query,
		user.UserId,
		user.Age,
		user.Gender,
		user.Weight,
		pq.Array(user.Interactions),
		pq.Array(user.Risks),
		pq.Array(user.Symptoms),
		pq.Array(user.SuggestedSupplements),
		pq.Array(user.SuggestedProducts),
		pq.Array(user.SavedSupplements),
		pq.Array(user.SavedProducts),
	).Scan(&id)

	if err != nil {
		return "", err
	}

	return id, nil
}

func QueryUpdateUserInfoSavedSupplements(dbConnection *sql.DB, userId string, supplementId string) error {
	query := `
		UPDATE "UserInfo"
		SET "SavedSupplements" = array_remove(array_cat(COALESCE("SavedSupplements", '{}') , ARRAY[$2]), $2) || ARRAY[$2]
		WHERE "UserId" = $1;
	`
	_, err := dbConnection.Exec(query, userId, supplementId)
	if err != nil {
		return err
	}

	return nil
}

func QueryUpdateUserInfoSavedProducts(dbConnection *sql.DB, userId string, productId string) error {
	query := `
		UPDATE "UserInfo"
		SET "SavedProducts" = array_remove(array_cat(COALESCE("SavedProducts", '{}') , ARRAY[$2]), $2) || ARRAY[$2]
		WHERE "UserId" = $1;
	`
	_, err := dbConnection.Exec(query, userId, productId)
	if err != nil {
		return err
	}

	return nil
}
