package endpointshelpers

import (
	"database/sql"
	dbqueries "sss/db/queries"
	"sss/shared"
)

func GetIngredients(dbConnection *sql.DB, interactionsRisksSymptoms shared.InteractionsRisksSymptoms) ([]string, error) {
	queryData, err := dbqueries.QueryIngredients(dbConnection, interactionsRisksSymptoms)
	if err != nil {
		return nil, err
	}

	return queryData, nil
}

func GetProducts(dbConnection *sql.DB, categories []string) ([]shared.Product, error) {
	// If no categories are provided, get all products from the database
	if len(categories) == 0 {
		products, err := dbqueries.QueryProducts(dbConnection)
		if err != nil {
			return nil, err
		}

		return products, nil
	}

	// Get the products from the database that match the categories
	products, err := dbqueries.QueryProductsFromCategories(dbConnection, categories)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func GetSupplements(dbConnection *sql.DB, ingredientData []string) ([]shared.SupplementsIngredients, error) {
	queryData, err := dbqueries.QuerySupplementsFromIngredients(dbConnection, ingredientData)
	if err != nil {
		return nil, err
	}

	supplementsIngredients := []shared.SupplementsIngredients{}

	for _, data := range queryData {
		isInData := false
		index := -1

		for i, si := range supplementsIngredients {
			if si.Id == data.Id {
				isInData = true
				index = i
				break
			}
		}

		if !isInData {
			// Add a new supplement and its first ingredient
			supplementsIngredients = append(supplementsIngredients, shared.SupplementsIngredients{
				Id:          data.Id,
				Name:        data.Name,
				Definition:  data.Definition,
				ImageUrl:    data.ImageUrl,
				LinkUrl:     data.LinkUrl,
				Ingredients: []string{data.IngredientName},
				Score:       0,
			})
		} else {
			// Append the ingredient to the existing supplement
			supplementsIngredients[index].Ingredients = append(supplementsIngredients[index].Ingredients, data.IngredientName)
		}
	}

	rankedSupplements := rankSupplements(supplementsIngredients, ingredientData)

	return rankedSupplements, nil
}
