package dbqueries

import "database/sql"

func QueryProductCategories(dbConnection *sql.DB) ([]string, error) {
	data := []string{}

	query := `
		SELECT DISTINCT "Category"."Title"
		FROM "Category"
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var title string

	for rows.Next() {
		err := rows.Scan(&title)
		if err != nil {
			return nil, err
		}
		data = append(data, title)
	}

	return data, nil
}
