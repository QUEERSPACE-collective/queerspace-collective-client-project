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

CREATE TABLE "programLocations" (
	"id" SERIAL PRIMARY KEY,
	"locationName" VARCHAR
);

INSERT INTO "programLocations" ("locationName")
VALUES ('St. Cloud'), ('Twin Cities');

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"dateTime" TIMESTAMP,
	"location" VARCHAR,
	"programLocationID" INT REFERENCES "programLocations",
	"type" INT,
	"description" VARCHAR
);

CREATE TABLE "userEvents" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user",
	"eventId" INT REFERENCES "events"
);

CREATE TABLE "questions"(
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


CREATE TABLE "userEvents" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user",
	"eventId" INT REFERENCES "events"
);


INSERT INTO "user" ("email","password","fname","lname","userType","pronouns","profilePic","bio","mentorPair")
VALUES('chrismaki123@gmail.com', 'f', 'Chris', 'Maki', '3', 'he/him', 'url', 'am not chris', '1'),
('janice4482@gmail.com', 'f', 'Janice', 'Janetson', '2', 'they/them', 'url', 'I like trains', '6'),
('billYahoo@yahoo.com', 'f', 'Bill', 'Billington', '3', 'they/them', 'url', 'kill bill is a movie', '2'),
('carlosMarlos@hotmail', 'f', 'Carlos', 'Marlos', '3', 'he/him', 'url', 'my name is Carlos', '8'),
('gregarious@gmail.com', 'f', 'Greg', 'Gregson', '3', 'she/they', 'url', 'this my bio', '13'),
('scaryMary@aol.com', 'f', 'Mary', 'Merrison', '3', 'she/her', 'url', 'im a sweet lady', '12'),
('jimmy@yahoo.com', 'f', 'Jimmy', 'Jimmerson', '3', 'he/she', 'url', 'jimbos the name', '11');


-----

INSERT INTO "events" ("name", "dateTime", "location", "programLocationID", "type", "description")
VALUES ('BBQ', '04/22/2022', 'Prime Digital Academy', '1', '2', 'we out here'),
		('Monthly get-together', '04/22/2022','Prime Digital Academy', '1', '2', 'come hang out!'),
		('Picnic', '04/22/2022', 'alleyway somehwere', '2','1','no plus ones'),
		('Snowboarding', '04/22/2022', 'Wild Mountain',  '1','5', 'dress warm!');
		
		
INSERT INTO "userEvents" ("userId", "eventId")
VALUES ('1', '2'), ('1', '3'), ('2', '1'), ('2', '2'), ('4', '1'), ('1','4');


INSERT INTO "questions" ("eventId", "question")
VALUES ('1', 'allergies?'), ('2', 'Desert preferences?'), ('3', 'dinner choices?'), ('4', 'do you need gloves?');

INSERT INTO "answers" ("questionId", "userId", "answer")
VALUES ('1', '1', 'user 1 answer'), ('2', '1', 'user 1 answer again'), ('3', '2','user 2 answer');



