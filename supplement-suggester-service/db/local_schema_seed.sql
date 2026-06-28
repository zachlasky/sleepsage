-- Local-only schema + seed for supplement-suggester-service.
-- Reconstructed from the Go query layer (db/queries + endpoints/helpers),
-- which is the only accurate source of truth now that the repo migrations have
-- drifted from the (now-gone) Supabase schema.
-- Apply against a fresh local Postgres db. NOT committed to the repo.

BEGIN;

DROP TABLE IF EXISTS "ProductCategoryMap","QuestionAnswerMap","QuestionSymptomMap",
  "SupplementIngredientMap","IngredientSymptomMap","IngredientInteractionMap",
  "IngredientRiskMap","UserInfo","Submission","Answer","Question","Category",
  "Product","Supplement","Ingredient","Symptom","Interaction","Risk" CASCADE;

-- ---------- Core entity tables ----------
CREATE TABLE "Supplement" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255),
  "Description" VARCHAR(1024),
  "ImageUrl" VARCHAR(512),
  "LinkUrl" VARCHAR(512)
);

CREATE TABLE "Product" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255),
  "Description" VARCHAR(1024),
  "ImageUrl" VARCHAR(512),
  "LinkUrl" VARCHAR(512)
);

CREATE TABLE "Category" (
  "Id" SERIAL PRIMARY KEY,
  "Title" VARCHAR(255)
);

CREATE TABLE "Ingredient" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(1024)
);

CREATE TABLE "Symptom" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(1024)
);

CREATE TABLE "Interaction" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(1024)
);

CREATE TABLE "Risk" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255),
  "Definition" VARCHAR(1024)
);

CREATE TABLE "Question" (
  "Id" SERIAL PRIMARY KEY,
  "Title" VARCHAR(255),
  "Category" VARCHAR(255),
  "IsMultiAnswer" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "Answer" (
  "Id" SERIAL PRIMARY KEY,
  "Title" VARCHAR(255)
);

-- ---------- Junction tables ----------
CREATE TABLE "SupplementIngredientMap" (
  "Id" SERIAL PRIMARY KEY,
  "SupplementId" INTEGER REFERENCES "Supplement"("Id"),
  "IngredientId" INTEGER REFERENCES "Ingredient"("Id")
);

CREATE TABLE "IngredientSymptomMap" (
  "Id" SERIAL PRIMARY KEY,
  "IngredientId" INTEGER REFERENCES "Ingredient"("Id"),
  "SymptomId" INTEGER REFERENCES "Symptom"("Id")
);

CREATE TABLE "IngredientInteractionMap" (
  "Id" SERIAL PRIMARY KEY,
  "IngredientId" INTEGER REFERENCES "Ingredient"("Id"),
  "InteractionId" INTEGER REFERENCES "Interaction"("Id")
);

CREATE TABLE "IngredientRiskMap" (
  "Id" SERIAL PRIMARY KEY,
  "IngredientId" INTEGER REFERENCES "Ingredient"("Id"),
  "RiskId" INTEGER REFERENCES "Risk"("Id")
);

CREATE TABLE "ProductCategoryMap" (
  "Id" SERIAL PRIMARY KEY,
  "ProductId" INTEGER REFERENCES "Product"("Id"),
  "CategoryId" INTEGER REFERENCES "Category"("Id")
);

CREATE TABLE "QuestionAnswerMap" (
  "Id" SERIAL PRIMARY KEY,
  "QuestionId" INTEGER REFERENCES "Question"("Id"),
  "AnswerId" INTEGER REFERENCES "Answer"("Id")
);

CREATE TABLE "QuestionSymptomMap" (
  "Id" SERIAL PRIMARY KEY,
  "QuestionId" INTEGER REFERENCES "Question"("Id"),
  "SymptomId" INTEGER REFERENCES "Symptom"("Id")
);

-- Submission / UserInfo: TEXT uuid PKs so RETURNING "Id" round-trips as a string
-- and `"Id" = $1` (text param) type-checks.
CREATE TABLE "Submission" (
  "Id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "Age" VARCHAR(255),
  "Gender" VARCHAR(255),
  "Weight" VARCHAR(255),
  "Interactions" TEXT[],
  "Risks" TEXT[],
  "Symptoms" TEXT[],
  "SuggestedSupplements" TEXT[],
  "SuggestedProducts" TEXT[]
);

CREATE TABLE "UserInfo" (
  "Id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "UserId" VARCHAR(255),
  "Age" VARCHAR(255),
  "Gender" VARCHAR(255),
  "Weight" VARCHAR(255),
  "Interactions" TEXT[],
  "Risks" TEXT[],
  "Symptoms" TEXT[],
  "SuggestedSupplements" TEXT[],
  "SuggestedProducts" TEXT[],
  "SavedSupplements" TEXT[],
  "SavedProducts" TEXT[]
);

-- ================= SEED DATA =================
INSERT INTO "Symptom" ("Name","Definition") VALUES
  ('Fatigue','Persistent tiredness or lack of energy'),
  ('Headache','Pain in the head or upper neck'),
  ('Insomnia','Difficulty falling or staying asleep'),
  ('Anxiety','Feelings of worry, nervousness, or unease'),
  ('Stress','Mental or emotional strain'),
  ('Nausea','A feeling of sickness with an urge to vomit'),
  ('Dizziness','A sensation of spinning or lightheadedness');

INSERT INTO "Interaction" ("Name","Definition") VALUES
  ('Alcohol','Regular alcohol consumption'),
  ('Antibiotics','Currently taking antibiotics'),
  ('Anticoagulants','Blood-thinning medication'),
  ('Antidepressants','Medication for depression or anxiety');

INSERT INTO "Risk" ("Name","Definition") VALUES
  ('Pregnancy','Currently pregnant or breastfeeding'),
  ('Kidney Disease','Reduced kidney function'),
  ('Liver Disease','Reduced liver function'),
  ('Hypertension','High blood pressure');

INSERT INTO "Ingredient" ("Name","Definition") VALUES
  ('Vitamin C','Antioxidant supporting immune function'),
  ('Vitamin D3','Supports bone health and immunity'),
  ('Vitamin B12','Supports energy and red blood cell formation'),
  ('Iron','Supports oxygen transport and energy'),
  ('Magnesium','Supports muscle, nerve, and sleep function'),
  ('Melatonin','Hormone that regulates the sleep cycle'),
  ('L-Theanine','Amino acid promoting calm focus'),
  ('Ashwagandha','Adaptogenic herb for stress resilience'),
  ('Omega-3','Essential fatty acids for heart and brain'),
  ('Zinc','Mineral supporting immune function');

INSERT INTO "Supplement" ("Name","Description","ImageUrl","LinkUrl") VALUES
  ('Vitamin C 1000mg','High-potency vitamin C to support immune health and reduce fatigue.','https://picsum.photos/seed/vitc/600/600','https://example.com/supplements/vitamin-c'),
  ('Vitamin D3 2000 IU','Daily vitamin D3 for bone strength, mood, and immune support.','https://picsum.photos/seed/vitd/600/600','https://example.com/supplements/vitamin-d3'),
  ('Vitamin B12 Sublingual','Fast-absorbing B12 to combat fatigue and support energy metabolism.','https://picsum.photos/seed/b12/600/600','https://example.com/supplements/vitamin-b12'),
  ('Gentle Iron Complex','Easy-on-the-stomach iron to support energy and healthy blood.','https://picsum.photos/seed/iron/600/600','https://example.com/supplements/iron'),
  ('Magnesium Glycinate','Highly absorbable magnesium for sleep, muscle, and stress relief.','https://picsum.photos/seed/mag/600/600','https://example.com/supplements/magnesium'),
  ('Melatonin 5mg','Supports healthy sleep onset and a balanced sleep cycle.','https://picsum.photos/seed/mela/600/600','https://example.com/supplements/melatonin'),
  ('L-Theanine 200mg','Promotes calm, focused relaxation without drowsiness.','https://picsum.photos/seed/thea/600/600','https://example.com/supplements/l-theanine'),
  ('Ashwagandha KSM-66','Clinically studied adaptogen for stress and anxiety support.','https://picsum.photos/seed/ashw/600/600','https://example.com/supplements/ashwagandha'),
  ('Omega-3 Fish Oil','High-EPA/DHA fish oil for heart, brain, and joint health.','https://picsum.photos/seed/fish/600/600','https://example.com/supplements/omega-3'),
  ('Zinc Picolinate','Well-absorbed zinc to support immune and skin health.','https://picsum.photos/seed/zinc/600/600','https://example.com/supplements/zinc');

INSERT INTO "Category" ("Title") VALUES
  ('Energy'),('Sleep'),('Stress & Mood'),('Immunity'),('Heart Health');

INSERT INTO "Product" ("Name","Description","ImageUrl","LinkUrl") VALUES
  ('DailyBoost Energy Multivitamin','Complete daily multivitamin formulated to fight fatigue.','https://picsum.photos/seed/prod1/600/600','https://example.com/products/dailyboost'),
  ('DreamWell Sleep Blend','Magnesium + melatonin blend for restful nights.','https://picsum.photos/seed/prod2/600/600','https://example.com/products/dreamwell'),
  ('CalmCore Stress Support','Ashwagandha and L-theanine for everyday calm.','https://picsum.photos/seed/prod3/600/600','https://example.com/products/calmcore'),
  ('ImmunoShield Defense','Vitamin C, D3, and zinc immune support pack.','https://picsum.photos/seed/prod4/600/600','https://example.com/products/immunoshield'),
  ('OmegaPure Heart Formula','Premium omega-3 fish oil for cardiovascular health.','https://picsum.photos/seed/prod5/600/600','https://example.com/products/omegapure');

-- Supplement <-> Ingredient (1:1 by name)
INSERT INTO "SupplementIngredientMap" ("SupplementId","IngredientId")
SELECT s."Id", i."Id" FROM (VALUES
  ('Vitamin C 1000mg','Vitamin C'),
  ('Vitamin D3 2000 IU','Vitamin D3'),
  ('Vitamin B12 Sublingual','Vitamin B12'),
  ('Gentle Iron Complex','Iron'),
  ('Magnesium Glycinate','Magnesium'),
  ('Melatonin 5mg','Melatonin'),
  ('L-Theanine 200mg','L-Theanine'),
  ('Ashwagandha KSM-66','Ashwagandha'),
  ('Omega-3 Fish Oil','Omega-3'),
  ('Zinc Picolinate','Zinc')
) AS m(sname,iname)
JOIN "Supplement" s ON s."Name"=m.sname
JOIN "Ingredient" i ON i."Name"=m.iname;

-- Ingredient <-> Symptom
INSERT INTO "IngredientSymptomMap" ("IngredientId","SymptomId")
SELECT i."Id", sy."Id" FROM (VALUES
  ('Vitamin B12','Fatigue'),
  ('Iron','Fatigue'),
  ('Vitamin D3','Fatigue'),
  ('Iron','Dizziness'),
  ('Magnesium','Headache'),
  ('Magnesium','Insomnia'),
  ('Melatonin','Insomnia'),
  ('Magnesium','Anxiety'),
  ('L-Theanine','Anxiety'),
  ('Ashwagandha','Anxiety'),
  ('Ashwagandha','Stress'),
  ('L-Theanine','Stress'),
  ('Vitamin B12','Nausea'),
  ('Vitamin C','Fatigue')
) AS m(iname,sname)
JOIN "Ingredient" i ON i."Name"=m.iname
JOIN "Symptom" sy ON sy."Name"=m.sname;

-- Ingredient <-> Interaction (filter-outs)
INSERT INTO "IngredientInteractionMap" ("IngredientId","InteractionId")
SELECT i."Id", it."Id" FROM (VALUES
  ('Melatonin','Antidepressants'),
  ('Ashwagandha','Antidepressants'),
  ('Omega-3','Anticoagulants'),
  ('Iron','Antibiotics')
) AS m(iname,itname)
JOIN "Ingredient" i ON i."Name"=m.iname
JOIN "Interaction" it ON it."Name"=m.itname;

-- Ingredient <-> Risk (filter-outs)
INSERT INTO "IngredientRiskMap" ("IngredientId","RiskId")
SELECT i."Id", r."Id" FROM (VALUES
  ('Ashwagandha','Pregnancy'),
  ('Vitamin D3','Kidney Disease'),
  ('Magnesium','Kidney Disease'),
  ('Iron','Liver Disease')
) AS m(iname,rname)
JOIN "Ingredient" i ON i."Name"=m.iname
JOIN "Risk" r ON r."Name"=m.rname;

-- Product <-> Category
INSERT INTO "ProductCategoryMap" ("ProductId","CategoryId")
SELECT p."Id", c."Id" FROM (VALUES
  ('DailyBoost Energy Multivitamin','Energy'),
  ('DreamWell Sleep Blend','Sleep'),
  ('CalmCore Stress Support','Stress & Mood'),
  ('ImmunoShield Defense','Immunity'),
  ('OmegaPure Heart Formula','Heart Health')
) AS m(pname,cname)
JOIN "Product" p ON p."Name"=m.pname
JOIN "Category" c ON c."Title"=m.cname;

-- ---------- Quiz ----------
INSERT INTO "Question" ("Title","Category","IsMultiAnswer") VALUES
  ('What is your age range?','Age',FALSE),                                  -- 1
  ('What is your gender?','Gender',FALSE),                                  -- 2
  ('What is your weight range?','Weight',FALSE),                            -- 3
  ('How often do you feel fatigued?','Symptoms',FALSE),                     -- 4 Fatigue
  ('How often do you get headaches?','Symptoms',FALSE),                     -- 5 Headache
  ('How often do you have trouble sleeping?','Symptoms',FALSE),             -- 6 Insomnia
  ('How often do you feel anxious?','Symptoms',FALSE),                      -- 7 Anxiety
  ('How often do you feel stressed?','Symptoms',FALSE),                     -- 8 Stress
  ('Are you currently taking any of the following?','Interactions',TRUE),   -- 9
  ('Do any of these health conditions apply to you?','Risks',TRUE);         -- 10

INSERT INTO "Answer" ("Title") VALUES
  ('Never'),('Sometimes'),('Often'),('Always'),                 -- frequency (shared)
  ('18-29'),('30-44'),('45-64'),('65+'),                        -- age
  ('Male'),('Female'),('Other'),                                -- gender
  ('Under 120 lbs'),('120-160 lbs'),('161-200 lbs'),('Over 200 lbs'), -- weight
  ('Alcohol'),('Antibiotics'),('Anticoagulants'),('Antidepressants'), -- interactions
  ('Pregnancy'),('Kidney Disease'),('Liver Disease'),('Hypertension'), -- risks
  ('None of the above');

-- Map answers to questions
-- Age
INSERT INTO "QuestionAnswerMap" ("QuestionId","AnswerId")
SELECT q."Id", a."Id" FROM "Question" q, "Answer" a
WHERE q."Title"='What is your age range?' AND a."Title" IN ('18-29','30-44','45-64','65+');
-- Gender
INSERT INTO "QuestionAnswerMap" ("QuestionId","AnswerId")
SELECT q."Id", a."Id" FROM "Question" q, "Answer" a
WHERE q."Title"='What is your gender?' AND a."Title" IN ('Male','Female','Other');
-- Weight
INSERT INTO "QuestionAnswerMap" ("QuestionId","AnswerId")
SELECT q."Id", a."Id" FROM "Question" q, "Answer" a
WHERE q."Title"='What is your weight range?' AND a."Title" IN ('Under 120 lbs','120-160 lbs','161-200 lbs','Over 200 lbs');
-- Symptom frequency questions (reuse Never/Sometimes/Often/Always)
INSERT INTO "QuestionAnswerMap" ("QuestionId","AnswerId")
SELECT q."Id", a."Id" FROM "Question" q, "Answer" a
WHERE q."Category"='Symptoms' AND a."Title" IN ('Never','Sometimes','Often','Always');
-- Interactions
INSERT INTO "QuestionAnswerMap" ("QuestionId","AnswerId")
SELECT q."Id", a."Id" FROM "Question" q, "Answer" a
WHERE q."Title"='Are you currently taking any of the following?'
  AND a."Title" IN ('Alcohol','Antibiotics','Anticoagulants','Antidepressants','None of the above');
-- Risks
INSERT INTO "QuestionAnswerMap" ("QuestionId","AnswerId")
SELECT q."Id", a."Id" FROM "Question" q, "Answer" a
WHERE q."Title"='Do any of these health conditions apply to you?'
  AND a."Title" IN ('Pregnancy','Kidney Disease','Liver Disease','Hypertension','None of the above');

-- Link symptom questions to their symptom
INSERT INTO "QuestionSymptomMap" ("QuestionId","SymptomId")
SELECT q."Id", s."Id" FROM (VALUES
  ('How often do you feel fatigued?','Fatigue'),
  ('How often do you get headaches?','Headache'),
  ('How often do you have trouble sleeping?','Insomnia'),
  ('How often do you feel anxious?','Anxiety'),
  ('How often do you feel stressed?','Stress')
) AS m(qtitle,sname)
JOIN "Question" q ON q."Title"=m.qtitle
JOIN "Symptom" s ON s."Name"=m.sname;

COMMIT;
