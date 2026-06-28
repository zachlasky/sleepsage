package endpointshelpers

import (
	"database/sql"
	dbqueries "sss/db/queries"
	"sss/shared"
)

type Answer struct {
	Id    int
	Title string
}

type Quiz struct {
	QuestionId            int
	QuestionTitle         string
	QuestionIsMultiAnswer bool
	Answers               []Answer
}

func getQuestionsAndCategories(dbConnection *sql.DB) ([]shared.QuizQuestionAndCategory, error) {
	queryData, err := dbqueries.QueryQuestionsAndCategories(dbConnection)
	if err != nil {
		return nil, err
	}

	questionsAndCategories := []shared.QuizQuestionAndCategory{}

	for _, data := range queryData {
		isInData := false

		// Check if the question already exists in questionsAndCategories
		for _, qc := range questionsAndCategories {
			if qc.QuestionId == data.QuestionId {
				isInData = true
				break
			}
		}

		if !isInData {
			// Add a new question and its first symptom
			questionsAndCategories = append(questionsAndCategories, shared.QuizQuestionAndCategory{
				QuestionId:       data.QuestionId,
				QuestionCategory: data.QuestionCategory,
				SymptomName:      data.SymptomName,
			})
		}
	}

	return questionsAndCategories, nil
}

func GetCategoryAnswers(dbConnection *sql.DB, quizRequestData []shared.QuizRequestQuestion) (shared.CategoryAnswers, error) {
	questionsCategories, err := getQuestionsAndCategories(dbConnection)
	if err != nil {
		return shared.CategoryAnswers{}, err
	}

	age := ""
	gender := ""
	hours := ""
	weight := ""
	interactions := []string{}
	risks := []string{}
	symptoms := []string{}

	for _, qc := range questionsCategories {
		for _, qr := range quizRequestData {
			if qc.QuestionId == qr.QuestionId {
				switch qc.QuestionCategory {
				case "Symptoms":
					if qc.SymptomName.Valid && (qr.Answers[0] == "Often" || qr.Answers[0] == "Always") {
						symptoms = append(symptoms, qc.SymptomName.String)
					}
				case "Interactions":
					for _, answer := range qr.Answers {
						if answer != "None of the above" {
							interactions = append(interactions, answer)
						}
					}
				case "Risks":
					for _, answer := range qr.Answers {
						if answer != "None of the above" {
							risks = append(risks, answer)
						}
					}
				case "Age":
					age = qr.Answers[0]
				case "Gender":
					gender = qr.Answers[0]
				case "Hours":
					hours = qr.Answers[0]
				case "Weight":
					weight = qr.Answers[0]
				}
			}
		}
	}

	categoryAnswers := shared.CategoryAnswers{
		Age:          age,
		Gender:       gender,
		Hours:        hours,
		Weight:       weight,
		Interactions: interactions,
		Risks:        risks,
		Symptoms:     symptoms,
	}

	return categoryAnswers, nil
}

func CreateQuizSubmission(dbConnection *sql.DB, submission shared.Submission) (string, error) {
	id, error := dbqueries.QueryCreateQuizSubmission(dbConnection, submission)
	if error != nil {
		return id, error
	}

	return id, nil
}

func GetQuiz(dbConnection *sql.DB) ([]Quiz, error) {
	queryData, err := dbqueries.QueryQuiz(dbConnection)
	if err != nil {
		return nil, err
	}

	quiz := []Quiz{}

	for _, data := range queryData {
		isInData := false
		index := -1

		// Check if the question already exists in quiz
		for i, qa := range quiz {
			if qa.QuestionId == data.QuestionId {
				isInData = true
				index = i
				break
			}
		}

		if !isInData {
			// Add a new question and its first answer
			quiz = append(quiz, Quiz{
				QuestionId:            data.QuestionId,
				QuestionTitle:         data.QuestionTitle,
				QuestionIsMultiAnswer: data.QuestionIsMultiAnswer,
				Answers:               []Answer{{Id: data.AnswerId, Title: data.AnswerTitle}},
			})
		} else {
			// Append the answer to the existing question
			quiz[index].Answers = append(quiz[index].Answers, Answer{Id: data.AnswerId, Title: data.AnswerTitle})
		}
	}

	return quiz, nil
}

func GetQuizResults(dbConnection *sql.DB, supplementIds []string, productIds []string) (shared.QuizResult, error) {
	// Get the supplements from the database
	supplements, err := dbqueries.QuerySupplementsById(dbConnection, supplementIds)
	if err != nil {
		return shared.QuizResult{}, err
	}

	// Order the supplements the same way they were requested (score order)
	orderedSupplements := []shared.Supplement{}
	for _, id := range supplementIds {
		for _, supplement := range supplements {
			if supplement.Id == id {
				orderedSupplements = append(orderedSupplements, supplement)
				break
			}
		}
	}

	// Get products from the database
	products := []shared.Product{}

	if len(productIds) > 0 {
		productsById, err := dbqueries.QueryProductsById(dbConnection, productIds)
		if err != nil {
			return shared.QuizResult{}, err
		}

		products = append(products, productsById...)
	} else {
		// If no productIds are provided, get all products from the database
		limitedProducts, err := dbqueries.QueryLimitedProducts(dbConnection)
		if err != nil {
			return shared.QuizResult{}, err
		}

		products = append(products, limitedProducts...)
	}

	// Combine the supplements and products into a single struct
	quizResult := shared.QuizResult{
		Supplements: orderedSupplements,
		Products:    products,
	}

	// Return the combined struct
	return quizResult, nil
}
