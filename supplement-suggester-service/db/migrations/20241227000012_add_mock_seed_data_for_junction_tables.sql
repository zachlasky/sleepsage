-- +goose Up
-- +goose StatementBegin
INSERT INTO "SupplementIngredientMap" ("SupplementId", "IngredientId") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
-- +goose StatementEnd

-- +goose StatementBegin
INSERT INTO "IngredientSymptomMap" ("IngredientId", "SymptomId") VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
-- +goose StatementEnd

-- +goose StatementBegin
INSERT INTO "IngredientInteractionMap" ("IngredientId", "InteractionId") VALUES
(1, 1),
(1, 2),
(1, 3),
(3, 3),
(4, 4),
(5, 5),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM "IngredientInteractionMap";
DELETE FROM "IngredientSymptomMap";
DELETE FROM "SupplementIngredientMap";
-- +goose StatementEnd
