CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR UNIQUE NOT NULL,
	"password" VARCHAR,
	"fname" VARCHAR,
	"lname" VARCHAR,
	"userType" INT,
	"pronouns" VARCHAR,
	"profilePic" VARCHAR,
	"bio" VARCHAR,
	"mentorPair" VARCHAR
);

CREATE TABLE "programLocations" (
	"id" SERIAL PRIMARY KEY,
	"locationName" VARCHAR
);

INSERT INTO "programLocations" ("locationName")
VALUES  ('Twin Cities'), ('St. Cloud');


CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"dateTime" TIMESTAMP,
	"location" VARCHAR,
	"programLocationID" INT REFERENCES "programLocations",
	"type" INT REFERENCES "eventTypes",
	"attendeeMax" INT,
	"hasVolunteers" BOOLEAN,
	"volunteerMax" INT,
	"description" VARCHAR
);

CREATE TABLE "eventTypes" (
	"id" SERIAL PRIMARY KEY,
	"eventType" VARCHAR NOT NULL
);

INSERT INTO "eventTypes" (
	"eventType"
)
VALUES 
('Group Hangout'),
('Family Event'),
('Training Event'),
('Mentor Only');

CREATE TABLE "questions"(
	"id" SERIAL PRIMARY KEY,
	"eventId" INT REFERENCES "events" ON DELETE CASCADE,
	"question" VARCHAR
);

CREATE TABLE "answers" (
	"id" SERIAL PRIMARY KEY,
	"questionId" INT REFERENCES "questions" ON DELETE CASCADE,
	"userId" INT REFERENCES "user" ON DELETE CASCADE,
	"answer" VARCHAR
);

CREATE TABLE "userEvents" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user",
	"eventId" INT REFERENCES "events"
);
