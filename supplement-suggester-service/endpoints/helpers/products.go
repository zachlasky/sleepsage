package endpointshelpers

import (
	"database/sql"
	dbqueries "sss/db/queries"
)

func GetProductCategories(dbConnection *sql.DB) ([]string, error) {
	// Get the product categories from the database
	categories, err := dbqueries.QueryProductCategories(dbConnection)
	if err != nil {
		return nil, err
	}

	return categories, nil
}
