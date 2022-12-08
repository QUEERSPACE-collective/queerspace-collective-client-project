--Create Table "user"
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
	"mentor_pair" VARCHAR
);

--CREATE TABLE "user_events"
CREATE TABLE "user_events" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"event_id" INT REFERENCES "events"
);

--CREATE TABLE "events"
CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"date_time" TIMESTAMP,
	"location" VARCHAR,
	"program_location" VARCHAR,
	"type" INT,
	"description" VARCHAR
);

--CREATE TABLE "questions"
CREATE TABLE "questions" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"question" VARCHAR
	);

--CREATE TABLE "answers"
CREATE TABLE "answers" (
	"id" SERIAL PRIMARY KEY,
	"questions_id" INT REFERENCES "questions",
	"user_id" INT REFERENCES "user",
	"answer" VARCHAR
);