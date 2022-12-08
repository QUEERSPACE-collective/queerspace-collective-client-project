CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR UNIQUE NOT NULL,
	"password" VARCHAR,
	"fname" VARCHAR,
	"lname" VARCHAR,
	"userType" INT,
	"pronouns" VARCHAR,
	"profilePic" VARCHAR,
	"bio" VARCHAR,
	"mentorPair" VARCHAR
	);


SELECT * FROM "user";
SELECT * FROM "events";
SELECT * FROM "questions";
SELECT * FROM "userEvents";
SELECT * FROM "answers";

SELECT * FROM "user" 
JOIN "userEvents" 
ON "userEvents"."userId" = "user"."id"
JOIN "events"
ON "events"."id" = "userEvents"."eventId";

SELECT * FROM "user"
JOIN "userEvents"
ON "userEvents"."userId" = "user"."id"
JOIN "events"
ON "events"."type" = "userEvents"."eventId";

SELECT * FROM "user"
JOIN "userEvents"
ON "userEvents"."userId" = "user"."id"
JOIN "events"
ON "events"."id" = "userEvents"."eventId"
JOIN "answers"
ON "answers"."userId" = "user"."id"
JOIN "questions"
ON "questions"."eventId" = "answers"."questionId";

SELECT * FROM "user"
JOIN "userEvents" 
ON "userEvents"."userId" = "user"."id"
JOIN "events" 
ON "events"."id" = "userEvents"."eventId";
------
SELECT * FROM "answers"
JOIN "questions"
ON "questions"."id" = "answers"."questionId"
JOIN "events"
ON "events"."id" = "questions"."eventId"
JOIN "user"
ON "user"."id" = "answers"."userId"
;
--------
INSERT INTO "user" ("email","password","fname","lname","userType","pronouns","profilePic","bio","mentorPair","hobbies")
VALUES('chrismaki123@gmail.com', 'f', 'Chris', 'Maki', '3', 'he/him', 'url', 'am not chris', '1', 'rock climbing'),
('janice4482@gmail.com', 'f', 'Janice', 'Janetson', '2', 'they/them', 'url', 'I like trains', '6', 'karate'),
('billYahoo@yahoo.com', 'f', 'Bill', 'Billington', '3', 'they/them', 'url', 'kill bill is a movie', '2', 'watching films'),
('carlosMarlos@hotmail', 'f', 'Carlos', 'Marlos', '3', 'he/him', 'url', 'my name is Carlos', '8', 'eating'),
('gregarious@gmail.com', 'f', 'Greg', 'Gregson', '3', 'she/they', 'url', 'this my bio', '13', 'pickleball'),
('scaryMary@aol.com', 'f', 'Mary', 'Merrison', '3', 'she/her', 'url', 'im a sweet lady', '12', 'sheep herding'),
('jimmy@yahoo.com', 'f', 'Jimmy', 'Jimmerson', '3', 'he/she', 'url', 'jimbos the name', '11', 'crockpotting');
CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"date" DATE,
	"time" TIME,
	"location" VARCHAR,
	"programLocation" VARCHAR,
	"type" INT,
	"description" VARCHAR
);
INSERT INTO "events" ("name", "date", "time", "location", "programLocation", "type", "description")
VALUES ('BBQ', '07/20/2022', '02:55:22', 'Prime Digital Academy', 'St.Paul', '2', 'we out here'),
		('Monthly get-together', '04/15/2022', '02:55:22','Prime Digital Academy', 'St.Paul', '2', 'come hang out!'),
		('Picnic', '01/1/2022', '02:55:22', 'alleyway somehwere', 'Minneapolis','1','no plus ones'),
		('Snowboarding', '04/05/2022', '02:55:22', 'Wild Mountain',  'St. Paul','5', 'dress warm!');
		
		
		
CREATE TABLE "userEvents" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user",
	"eventId" INT REFERENCES "events"
);


CREATE TABLE "questions" (
	"id" SERIAL PRIMARY KEY,
	"eventId" INT REFERENCES "events",
	"question" VARCHAR
);
CREATE TABLE "answers" (
	"id" SERIAL PRIMARY KEY,
	"questionId" INT REFERENCES "questions",
	"userId" INT REFERENCES "user",
	"answer" VARCHAR
);