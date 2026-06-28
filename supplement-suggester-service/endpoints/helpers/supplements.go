package endpointshelpers

import (
	"cmp"
	"slices"
	"sss/shared"
)

func rankSupplements(supplementsIngredients []shared.SupplementsIngredients, ingredientData []string) []shared.SupplementsIngredients {
	for i := range supplementsIngredients {
		score := 0
		for _, ingredient := range supplementsIngredients[i].Ingredients {
			if slices.Contains(ingredientData, ingredient) {
				score++ // +1 if the ingredient is in `ingredientData`
			} else {
				score-- // -1 if it's an extra ingredient
			}
		}
		supplementsIngredients[i].Score = score
	}

	// Sort by score (descending)
	slices.SortFunc(supplementsIngredients, func(a, b shared.SupplementsIngredients) int {
		return cmp.Compare(b.Score, a.Score) // Higher scores first
	})

	return supplementsIngredients
}
