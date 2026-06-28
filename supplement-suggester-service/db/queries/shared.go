package dbqueries

import (
	"database/sql"
	"sss/shared"

	"github.com/lib/pq"
)

func QueryIngredients(dbConnection *sql.DB, interactionsRisksSymptoms shared.InteractionsRisksSymptoms) ([]string, error) {
	data := []string{}

	query := `
		SELECT DISTINCT "Ingredient"."Name"
		FROM "Ingredient"
		LEFT JOIN "IngredientSymptomMap" ON "Ingredient"."Id" = "IngredientSymptomMap"."IngredientId"
		LEFT JOIN "Symptom" ON "IngredientSymptomMap"."SymptomId" = "Symptom"."Id"
		WHERE 
			($1::TEXT[] IS NULL OR cardinality($1::TEXT[]) = 0 OR "Symptom"."Name" = ANY($1::TEXT[]))

		AND NOT EXISTS (
			SELECT 1
			FROM "IngredientInteractionMap"
			JOIN "Interaction" ON "IngredientInteractionMap"."InteractionId" = "Interaction"."Id"
			WHERE "IngredientInteractionMap"."IngredientId" = "Ingredient"."Id"
			AND "Interaction"."Name" = ANY($2::TEXT[])
		)

		AND NOT EXISTS (
			SELECT 1
			FROM "IngredientRiskMap"
			JOIN "Risk" ON "IngredientRiskMap"."RiskId" = "Risk"."Id"
			WHERE "IngredientRiskMap"."IngredientId" = "Ingredient"."Id"
			AND "Risk"."Name" = ANY($3::TEXT[])
		);
	`

	rows, err := dbConnection.Query(query, pq.Array(interactionsRisksSymptoms.Symptoms), pq.Array(interactionsRisksSymptoms.Interactions), pq.Array(interactionsRisksSymptoms.Risks))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var name string
	for rows.Next() {
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		data = append(data, name)
	}

	return data, nil
}

func QueryProducts(dbConnection *sql.DB) ([]shared.Product, error) {
	data := []shared.Product{}

	query := `
		SELECT DISTINCT "Product"."Id", "Product"."Name", "Product"."Description", "Product"."ImageUrl", "Product"."LinkUrl"
		FROM "Product"
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

func QueryProductsFromCategories(dbConnection *sql.DB, categories []string) ([]shared.Product, error) {
	data := []shared.Product{}

	query := `
		SELECT DISTINCT "Product"."Id", "Product"."Name", "Product"."Description", "Product"."ImageUrl", "Product"."LinkUrl"
		FROM "Product"
		JOIN "ProductCategoryMap" ON "Product"."Id" = "ProductCategoryMap"."ProductId"
		JOIN "Category" ON "ProductCategoryMap"."CategoryId" = "Category"."Id"
		WHERE "Category"."Title" = ANY($1)
	`

	rows, err := dbConnection.Query(query, pq.Array(categories))
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

func QuerySupplementsFromIngredients(dbConnection *sql.DB, ingredientData []string) ([]shared.SupplementIngredientMap, error) {
	data := []shared.SupplementIngredientMap{}

	query := `
		SELECT DISTINCT "Supplement"."Id", "Supplement"."Name", "Supplement"."Description", "Supplement"."ImageUrl", "Supplement"."LinkUrl", "Ingredient"."Name"
		FROM "Supplement"
		JOIN "SupplementIngredientMap" ON "Supplement"."Id" = "SupplementIngredientMap"."SupplementId"
		JOIN "Ingredient" ON "SupplementIngredientMap"."IngredientId" = "Ingredient"."Id"
		WHERE "Ingredient"."Name" = ANY($1)
	`

	rows, err := dbConnection.Query(query, pq.Array(ingredientData))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var id, name, definition, imageUrl, linkUrl, ingredientName string

	for rows.Next() {
		err := rows.Scan(&id, &name, &definition, &imageUrl, &linkUrl, &ingredientName)
		if err != nil {
			return nil, err
		}
		data = append(data, shared.SupplementIngredientMap{
			Id: id, Name: name, Definition: definition, ImageUrl: imageUrl, LinkUrl: linkUrl, IngredientName: ingredientName,
		})
	}

	return data, nil
}
