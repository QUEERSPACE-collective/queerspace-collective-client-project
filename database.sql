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
    "mentorPair" VARCHAR,
    "token" VARCHAR
);

INSERT INTO "user" ("username","password","fname","lname","userType","pronouns","profilePic","bio","mentorPair")
VALUES('chrismaki123@gmail.com', 'f', 'Chris', 'Maki', '3', 'he/him', 'url', 'am not chris', '1'),
('janice4482@gmail.com', 'f', 'Janice', 'Janetson', '2', 'they/them', 'url', 'I like trains', '6'),
('billYahoo@yahoo.com', 'f', 'Bill', 'Billington', '3', 'they/them', 'url', 'kill bill is a movie', '2'),
('carlosMarlos@hotmail', 'f', 'Carlos', 'Marlos', '3', 'he/him', 'url', 'my name is Carlos', '8'),
('gregarious@gmail.com', 'f', 'Greg', 'Gregson', '3', 'she/they', 'url', 'this my bio', '13'),
('scaryMary@aol.com', 'f', 'Mary', 'Merrison', '3', 'she/her', 'url', 'im a sweet lady', '12'),
('jimmy@yahoo.com', 'f', 'Jimmy', 'Jimmerson', '3', 'he/she', 'url', 'jimbos the name', '11');

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

--DROP TABLE "userEvents";
--DROP TABLE "answers";
--DROP TABLE "questions";
--DROP TABLE "user";
--DROP TABLE "events";
--DROP TABLE "programLocations";
--DROP TABLE "eventTypes";