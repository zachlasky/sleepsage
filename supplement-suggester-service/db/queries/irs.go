package dbqueries

import "database/sql"

func QueryInteractions(dbConnection *sql.DB) ([]string, error) {
	data := []string{}

	query := `
		SELECT DISTINCT "Interaction"."Name"
		FROM "Interaction"
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var name string

	for rows.Next() {
		err := rows.Scan(&name)
		if err != nil {
			return nil, err
		}
		data = append(data, name)
	}

	return data, nil
}

func QueryRisks(dbConnection *sql.DB) ([]string, error) {
	data := []string{}

	query := `
		SELECT DISTINCT "Risk"."Name"
		FROM "Risk"
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var name string

	for rows.Next() {
		err := rows.Scan(&name)
		if err != nil {
			return nil, err
		}
		data = append(data, name)
	}

	return data, nil
}

func QuerySymptoms(dbConnection *sql.DB) ([]string, error) {
	data := []string{}

	query := `
		SELECT DISTINCT "Symptom"."Name"
		FROM "Symptom"
	`

	rows, err := dbConnection.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var name string

	for rows.Next() {
		err := rows.Scan(&name)
		if err != nil {
			return nil, err
		}
		data = append(data, name)
	}

	return data, nil
}
