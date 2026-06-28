-- +goose Up
-- +goose StatementBegin
-- Insert questions
INSERT INTO "Question" ("Title", "Type", "HasFreeformAnswers") VALUES
('Do you have trouble falling asleep quickly and easily when you go to bed?', 'Radio', FALSE),
('Do you frequently wake up during the night and find it difficult to stay asleep?', 'Radio', FALSE),
('Are you currently taking any of the following medications?', 'Checkbox', TRUE),
('Are you currently experiencing any of the following symptoms?', 'Checkbox', TRUE);

-- Insert answers
INSERT INTO "Answer" ("Title") VALUES
('Never'),
('Sometimes'),
('Often'),
('Always'),
('Antibiotics'),
('Stimulants'),
('Insomnia'),
('Anxiety');

-- Map answers to the first question
INSERT INTO "QuestionAnswerMap" ("QuestionId", "AnswerId") VALUES
(1, 1), -- Never
(1, 2), -- Sometimes
(1, 3), -- Often
(1, 4); -- Always

-- Map answers to the second question
INSERT INTO "QuestionAnswerMap" ("QuestionId", "AnswerId") VALUES
(2, 1), -- Never
(2, 2), -- Sometimes
(2, 3), -- Often
(2, 4); -- Always

-- Map answers to the third question
INSERT INTO "QuestionAnswerMap" ("QuestionId", "AnswerId") VALUES
(3, 5), -- Antibiotics
(3, 6); -- Stimulants

-- Map answers to the fourth question
INSERT INTO "QuestionAnswerMap" ("QuestionId", "AnswerId") VALUES
(4, 7), -- Insomnia
(4, 8); -- Anxiety
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM "QuestionAnswerMap"
DELETE FROM "Answer"
DELETE FROM "Question"
-- +goose StatementEnd
