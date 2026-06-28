package dbqueries

import (
	"database/sql"
	"sss/shared"

	"github.com/lib/pq"
)

func QueryQuestionsAndCategories(dbConnection *sql.DB) ([]shared.QuizQuestionAndCategory, error) {
	data := []shared.QuizQuestionAndCategory{}

	query := `
		SELECT DISTINCT "Question"."Id", "Question"."Category", "Symptom"."Name"
		FROM "Question"

		LEFT JOIN "QuestionSymptomMap" ON "Question"."Id" = "QuestionSymptomMap"."QuestionId"
		LEFT JOIN "Symptom" ON "QuestionSymptomMap"."SymptomId" = "Symptom"."Id"

		ORDER BY "Question"."Id"
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var questionId int
	var questionCategory string
	var symptomName sql.NullString

	for rows.Next() {
		err := rows.Scan(&questionId, &questionCategory, &symptomName)
		if err != nil {
			return nil, err
		}

		data = append(data, shared.QuizQuestionAndCategory{QuestionId: questionId, QuestionCategory: questionCategory, SymptomName: symptomName})
	}

	return data, nil
}

func QueryCreateQuizSubmission(dbConnection *sql.DB, submission shared.Submission) (string, error) {
	query := `
		INSERT INTO "Submission" ("Age", "Gender", "Weight", "Interactions", "Risks", "Symptoms", "SuggestedSupplements", "SuggestedProducts")
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING "Id";
	`

	var id string
	err := dbConnection.QueryRow(query,
		submission.Age,
		submission.Gender,
		submission.Weight,
		pq.Array(submission.Interactions),
		pq.Array(submission.Risks),
		pq.Array(submission.Symptoms),
		pq.Array(submission.SuggestedSupplements),
		pq.Array(submission.SuggestedProducts),
	).Scan(&id)

	if err != nil {
		return "", err
	}

	return id, nil
}

func QueryQuiz(dbConnection *sql.DB) ([]shared.QuizQuestion, error) {
	data := []shared.QuizQuestion{}

	query := `
		SELECT DISTINCT "Question"."Id", "Question"."Title", "Question"."IsMultiAnswer", "Answer"."Id", "Answer"."Title"
		FROM "Question"

		LEFT JOIN "QuestionAnswerMap" ON "Question"."Id" = "QuestionAnswerMap"."QuestionId"
		LEFT JOIN "Answer" ON "QuestionAnswerMap"."AnswerId" = "Answer"."Id"

		ORDER BY "Question"."Id", "Answer"."Id"
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var questionId int
	var questionTitle string
	var questionIsMultiAnswer bool
	var answerId int
	var answerTitle string

	for rows.Next() {
		err := rows.Scan(&questionId, &questionTitle, &questionIsMultiAnswer, &answerId, &answerTitle)
		if err != nil {
			return nil, err
		}

		data = append(data, shared.QuizQuestion{QuestionId: questionId, QuestionTitle: questionTitle, QuestionIsMultiAnswer: questionIsMultiAnswer, AnswerId: answerId, AnswerTitle: answerTitle})
	}

	return data, nil
}

func QuerySupplementsById(dbConnection *sql.DB, supplementIds []string) ([]shared.Supplement, error) {
	data := []shared.Supplement{}

	query := `
		SELECT DISTINCT "Supplement"."Id", "Supplement"."Name", "Supplement"."Description", "Supplement"."ImageUrl", "Supplement"."LinkUrl"
		FROM "Supplement"
		WHERE "Supplement"."Id" = ANY($1)
		LIMIT 3
	`

	rows, err := dbConnection.Query(query, pq.Array(supplementIds))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var id, name, definition, imageUrl, linkUrl string

	for rows.Next() {
		err := rows.Scan(&id, &name, &definition, &imageUrl, &linkUrl)
		if err != nil {
			return nil, err
		}
		data = append(data, shared.Supplement{Id: id, Name: name, Definition: definition, ImageUrl: imageUrl, LinkUrl: linkUrl})
	}

	return data, nil
}

func QueryProductsById(dbConnection *sql.DB, productIds []string) ([]shared.Product, error) {
	data := []shared.Product{}

	// If no Ids match, return 3 products
	query := `
		WITH matched_products AS (
			SELECT "Product"."Id", "Product"."Name", "Product"."Description", "Product"."ImageUrl", "Product"."LinkUrl"
			FROM "Product"
			WHERE "Product"."Id" = ANY($1)
			LIMIT 3
		)
		SELECT * FROM matched_products
		UNION ALL
		SELECT "Product"."Id", "Product"."Name", "Product"."Description", "Product"."ImageUrl", "Product"."LinkUrl"
		FROM "Product"
		WHERE (SELECT COUNT(*) FROM matched_products) = 0
		LIMIT 3;
	`

	rows, err := dbConnection.Query(query, pq.Array(productIds))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var id, name, description, imageUrl, linkUrl string

	for rows.Next() {
		err := rows.Scan(&id, &name, &description, &imageUrl, &linkUrl)
		if err != nil {
			return nil, err
		}
		data = append(data, shared.Product{Id: id, Name: name, Description: description, ImageUrl: imageUrl, LinkUrl: linkUrl})
	}

	return data, nil
}

func QueryLimitedProducts(dbConnection *sql.DB) ([]shared.Product, error) {
	data := []shared.Product{}

	query := `
		SELECT "Product"."Id", "Product"."Name", "Product"."Description", "Product"."ImageUrl", "Product"."LinkUrl"
		FROM "Product"
		LIMIT 3
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var id, name, description, imageUrl, linkUrl string

	for rows.Next() {
		err := rows.Scan(&id, &name, &description, &imageUrl, &linkUrl)
		if err != nil {
			return nil, err
		}
		data = append(data, shared.Product{Id: id, Name: name, Description: description, ImageUrl: imageUrl, LinkUrl: linkUrl})
	}

	return data, nil
}
