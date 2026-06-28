package endpointshelpers

import (
	"database/sql"
	dbqueries "sss/db/queries"
	"sss/shared"
)

func GetInteractionsRisksSymptoms(dbConnection *sql.DB) (shared.InteractionsRisksSymptoms, error) {
	// Query interactions
	interactionData, err := dbqueries.QueryInteractions(dbConnection)
	if err != nil {
		return shared.InteractionsRisksSymptoms{}, err
	}

	// Query risks
	riskData, err := dbqueries.QueryRisks(dbConnection)
	if err != nil {
		return shared.InteractionsRisksSymptoms{}, err
	}

	// Query symptoms
	symptomData, err := dbqueries.QuerySymptoms(dbConnection)
	if err != nil {
		return shared.InteractionsRisksSymptoms{}, err
	}

	// Combine the data into a single struct
	interactionsRisksSymptomsData := shared.InteractionsRisksSymptoms{
		Interactions: interactionData,
		Risks:        riskData,
		Symptoms:     symptomData,
	}

	// Return the combined struct
	return interactionsRisksSymptomsData, nil
}
