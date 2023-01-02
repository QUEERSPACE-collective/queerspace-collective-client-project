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

CREATE TABLE "eventTypes" (
	"id" SERIAL PRIMARY KEY,
	"eventType" VARCHAR NOT NULL
);

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"dateTime" TIMESTAMP,
	"location" VARCHAR,
	"programLocationID" INT REFERENCES "programLocations",
	"type" INT REFERENCES "eventTypes",
	"registeredAttendees" INT,
	"attendeeMax" INT,
	"hasVolunteers" BOOLEAN,
	"registeredVolunteers" INT,
	"volunteerMax" INT,
	"description" VARCHAR
);

INSERT INTO "eventTypes" ("eventType")
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
	"userId" INT REFERENCES "user" ON DELETE CASCADE,
	"eventId" INT REFERENCES "events" ON DELETE CASCADE
);

INSERT INTO "events" ("name", "dateTime", "location", "programLocationID", "type", "description")
VALUES ('BBQ', '04/22/2022', 'Prime Digital Academy', '1', '2', 'we out here'),
		('Monthly get-together', '04/22/2022','Prime Digital Academy', '1', '2', 'come hang out!'),
		('Picnic', '04/22/2022', 'alleyway somehwere', '2','1','no plus ones'),
		('Snowboarding', '04/22/2022', 'Wild Mountain',  '1','4', 'dress warm!');
		
CREATE TABLE "resources" (
	"id" SERIAL PRIMARY KEY,
	"resourceName" VARCHAR,
	"resourceDescription" VARCHAR,
	"resourceLink" VARCHAR
);
-----------  keeeep

--SELECT "questions"."eventId", "questionId", "question", "answer", "name", "location", "description", "user"."username","fname","lname","userType"
--    FROM "questions"
--       RIGHT JOIN "answers" ON "answers"."questionId" = "questions"."id"
--       LEFT JOIN "events" ON "events"."id" = "questions"."eventId" 
--       LEFT JOIN "user" ON "user"."id" = "answers"."userId"
--       LEFT JOIN "userEvents" ON "userEvents"."eventId" = "events"."id" and "events"."id" = "answers"."questionId"
--       LEFT JOIN "eventTypes" ON "eventTypes"."id" = "events"."id" GROUP BY "user"."fname", "questions"."eventId", "answers"."questionId", "questions"."question", "answers"."answer", "events"."name", "events"."location", "events"."description", "user"."username", "user"."lname", "user"."userType";
--        

--DROP TABLE "userEvents";
--DROP TABLE "answers";
--DROP TABLE "questions";
--DROP TABLE "user";
--DROP TABLE "events";
--DROP TABLE "programLocations";
--DROP TABLE "eventTypes";