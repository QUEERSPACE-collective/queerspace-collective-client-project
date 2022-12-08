CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR UNIQUE NOT NULL,
	"password" VARCHAR,
	"fname" VARCHAR,
	"lname" VARCHAR,
	"user_type" INT,
	"pronouns" VARCHAR,
	"profile_pic" VARCHAR,
	"bio" VARCHAR,
	"mentor_pair" VARCHAR,
	"hobbies" VARCHAR
);

INSERT INTO "user" ("email","password","fname","lname","user_type","pronouns","profile_pic","bio","mentor_pair","hobbies")
VALUES('chrismaki123@gmail.com', 'f', 'Chris', 'Maki', '3', 'he/him', 'url', 'am not chris', '1', 'rock climbing'),
('janice4482@gmail.com', 'f', 'Janice', 'Janetson', '2', 'they/them', 'url', 'I like trains', '6', 'karate'),
('billYahoo@yahoo.com', 'f', 'Bill', 'Billington', '3', 'they/them', 'url', 'kill bill is a movie', '2', 'watching films'),
('carlosMarlos@hotmail', 'f', 'Carlos', 'Marlos', '3', 'he/him', 'url', 'my name is Carlos', '8', 'eating'),
('gregarious@gmail.com', 'f', 'Greg', 'Gregson', '3', 'she/they', 'url', 'this my bio', '13', 'pickleball'),
('scaryMary@aol.com', 'f', 'Mary', 'Merrison', '3', 'she/her', 'url', 'im a sweet lady', '12', 'sheep herding'),
('jimmy@yahoo.com', 'f', 'Jimmy', 'Jimmerson', '3', 'he/she', 'url', 'jimbos the name', '11', 'crockpotting');

--DROP TABLE "events";
CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"date_time" TIMESTAMP,
	"location" VARCHAR,
	"program_location" VARCHAR,
	"type" INT,
	"description" VARCHAR
);

--DROP TABLE "user_events";
CREATE TABLE "user_events" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"event_id" INT REFERENCES "events"
);

--DROP TABLE "questions";
CREATE TABLE "questions" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"question" VARCHAR
);

--DROP TABLE "answers";
CREATE TABLE "answers" (
	"id" SERIAL PRIMARY KEY,
	"question_id" INT REFERENCES "questions",
	"user_id" INT REFERENCES "user",
	"answer" VARCHAR
);
