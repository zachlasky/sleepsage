-- +goose Up
-- +goose StatementBegin
CREATE TABLE "Question" (
  "Id" SERIAL,
  "Title" VARCHAR(255),
  "Type" VARCHAR(255),
  "HasFreeformAnswers" BOOLEAN,
  PRIMARY KEY ("Id")
);

CREATE TABLE "Answer" (
  "Id" SERIAL,
  "Title" VARCHAR(255),
  PRIMARY KEY ("Id")
);

CREATE TABLE "QuestionAnswerMap" (
  "Id" SERIAL,
  "QuestionId" SERIAL,
  "AnswerId" SERIAL,
  PRIMARY KEY ("Id"),
  FOREIGN KEY ("QuestionId") REFERENCES "Question"("Id"),
  FOREIGN KEY ("AnswerId") REFERENCES "Answer"("Id")
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS "QuestionAnswerMap";
DROP TABLE IF EXISTS "Answer";
DROP TABLE IF EXISTS "Question";
-- +goose StatementEnd
