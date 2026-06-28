-- +goose Up
-- +goose StatementBegin
CREATE TABLE "Supplement" (
  "Id" SERIAL,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(255),
  "ImageUrl" VARCHAR(255),
  "LinkUrl" VARCHAR(255),
  PRIMARY KEY ("Id")
);

CREATE TABLE "Symptom" (
  "Id" SERIAL,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(255),
  PRIMARY KEY ("Id")
);

CREATE TABLE "Ingredient" (
  "Id" SERIAL,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(255),
  PRIMARY KEY ("Id")
);

CREATE TABLE "SupplementIngredientMap" (
  "Id" SERIAL,
  "SupplementId" SERIAL,
  "IngredientId" SERIAL,
  PRIMARY KEY ("Id"),
  CONSTRAINT "FK_SupplementIngredientMap.SupplementId"
    FOREIGN KEY ("SupplementId")
      REFERENCES "Supplement"("Id"),
  CONSTRAINT "FK_SupplementIngredientMap.IngredientId"
    FOREIGN KEY ("IngredientId")
      REFERENCES "Ingredient"("Id")
);

CREATE TABLE "IngredientSymptomMap" (
  "Id" SERIAL,
  "IngredientId" SERIAL,
  "SymptomId" SERIAL,
  PRIMARY KEY ("Id"),
  CONSTRAINT "FK_IngredientSymptomMap.IngredientId"
    FOREIGN KEY ("IngredientId")
      REFERENCES "Ingredient"("Id"),
  CONSTRAINT "FK_IngredientSymptomMap.SymptomId"
    FOREIGN KEY ("SymptomId")
      REFERENCES "Symptom"("Id")
);

CREATE TABLE "Interaction" (
  "Id" SERIAL,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(255),
  PRIMARY KEY ("Id")
);

CREATE TABLE "IngredientInteractionMap" (
  "Id" SERIAL,
  "IngredientId" SERIAL,
  "InteractionId" SERIAL,
  PRIMARY KEY ("Id"),
  CONSTRAINT "FK_IngredientInteractionMap.IngredientId"
    FOREIGN KEY ("IngredientId")
      REFERENCES "Ingredient"("Id"),
  CONSTRAINT "FK_IngredientInteractionMap.InteractionId"
    FOREIGN KEY ("InteractionId")
      REFERENCES "Interaction"("Id")
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS "SupplementIngredientMap";
DROP TABLE IF EXISTS "IngredientSymptomMap";
DROP TABLE IF EXISTS "IngredientInteractionMap";
DROP TABLE IF EXISTS "Supplement";
DROP TABLE IF EXISTS "Symptom";
DROP TABLE IF EXISTS "Ingredient";
DROP TABLE IF EXISTS "Interaction";
-- +goose StatementEnd
