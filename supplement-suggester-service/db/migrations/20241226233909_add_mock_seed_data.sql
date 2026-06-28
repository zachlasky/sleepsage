-- +goose Up
-- +goose StatementBegin
INSERT INTO "Supplement" ("Name", "Definition", "ImageUrl", "LinkUrl") VALUES
('Vitamin C', 'Essential for growth and repair of tissues', 'https://example.com/vitamin-c.jpg', 'https://example.com/vitamin-c'),
('Vitamin D', 'Helps maintain healthy bones and teeth', 'https://example.com/vitamin-d.jpg', 'https://example.com/vitamin-d'),
('Vitamin B12', 'Important for red blood cell formation', 'https://example.com/vitamin-b12.jpg', 'https://example.com/vitamin-b12'),
('Iron', 'Necessary for the production of hemoglobin', 'https://example.com/iron.jpg', 'https://example.com/iron'),
('Calcium', 'Vital for bone health', 'https://example.com/calcium.jpg', 'https://example.com/calcium');
-- +goose StatementEnd

-- +goose StatementBegin
INSERT INTO "Symptom" ("Name", "Definition") VALUES
('Fatigue', 'Extreme tiredness resulting from mental or physical exertion'),
('Headache', 'Pain in the head or upper neck'),
('Nausea', 'A feeling of sickness with an inclination to vomit'),
('Dizziness', 'A sensation of spinning and loss of balance'),
('Insomnia', 'Persistent problems falling and staying asleep');
-- +goose StatementEnd

-- +goose StatementBegin
INSERT INTO "Ingredient" ("Name", "Definition") VALUES
('Ascorbic Acid', 'A natural water-soluble vitamin (Vitamin C)'),
('Cholecalciferol', 'A form of Vitamin D'),
('Cobalamin', 'A form of Vitamin B12'),
('Ferrous Sulfate', 'A form of Iron'),
('Calcium Carbonate', 'A form of Calcium');
-- +goose StatementEnd

-- +goose StatementBegin
INSERT INTO "Interaction" ("Name", "Definition") VALUES
('Alcohol', 'Interaction with alcohol'),
('Antibiotics', 'Interaction with antibiotics'),
('Anticoagulants', 'Interaction with anticoagulants'),
('Anticonvulsants', 'Interaction with anticonvulsants'),
('Antidepressants', 'Interaction with antidepressants');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM "Interaction";
DELETE FROM "Ingredient";
DELETE FROM "Symptom";
DELETE FROM "Supplement";
-- +goose StatementEnd
