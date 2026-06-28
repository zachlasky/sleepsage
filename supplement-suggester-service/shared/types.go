package shared

import (
	"database/sql"
)

type SupplementRequestData struct {
	Q1 []string `json:"Q1"`
	Q2 []string `json:"Q2"`
	Q3 []string `json:"Q3"`
	Q4 []string `json:"Q4"`
}

type SymptomsAndInteractions struct {
	Interactions        []string
	InvalidInteractions []string
	Symptoms            []string
	InvalidSymptoms     []string
}

type CleanedSymptomsAndInteractions struct {
	Interactions []string
	Symptoms     []string
}

type InteractionsRisksSymptoms struct {
	Interactions []string
	Risks        []string
	Symptoms     []string
}

type Ingredient struct {
	Name       string
	Definition string
}

type Supplement struct {
	Id         string
	Name       string
	Definition string
	ImageUrl   string
	LinkUrl    string
}

type SupplementIngredientMap struct {
	Id             string
	Name           string
	Definition     string
	ImageUrl       string
	LinkUrl        string
	IngredientName string
}

type SupplementsIngredients struct {
	Id          string
	Name        string
	Definition  string
	ImageUrl    string
	LinkUrl     string
	Ingredients []string
	Score       int
}

type QuizRequestQuestion struct {
	QuestionId int
	Answers    []string
}

type QuizQuestion struct {
	QuestionId            int
	QuestionTitle         string
	QuestionIsMultiAnswer bool
	AnswerId              int
	AnswerTitle           string
}

type QuizQuestionAndCategory struct {
	QuestionId       int
	QuestionCategory string
	SymptomName      sql.NullString
}

type CategoryAnswers struct {
	Age          string
	Gender       string
	Hours        string
	Weight       string
	Interactions []string
	Risks        []string
	Symptoms     []string
}

type Product struct {
	Id          string
	Name        string
	Description string
	ImageUrl    string
	LinkUrl     string
}

type QuizResult struct {
	Supplements []Supplement
	Products    []Product
}

type Submission struct {
	Id                   string
	Age                  string
	Gender               string
	Weight               string
	SuggestedSupplements []string
	SuggestedProducts    []string
	Interactions         []string
	Risks                []string
	Symptoms             []string
}

type UserInfo struct {
	Id                   string
	UserId               string
	Age                  string
	Gender               string
	Weight               string
	SavedSupplements     []string
	SavedProducts        []string
	SuggestedSupplements []string
	SuggestedProducts    []string
	Interactions         []string
	Risks                []string
	Symptoms             []string
}

type UserInfoRequestData struct {
	UserId       string
	SupplementId string
	ProductId    string
	SubmissionId string // Used if a quiz submission id has been saved in the UI
}

type UserInfoUpdateData struct {
	SupplementId string
	ProductId    string
}
