
----
--DROP TABLE "userEvents";
--DROP TABLE "answers";
--DROP TABLE "questions";
--DROP TABLE "user";
--DROP TABLE "events";
--DROP TABLE "programLocations";
--DROP TABLE "eventTypes";
--DROP TABLE "resources"

--copy, paste and run everything below in this order (one enter)

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
INSERT INTO "eventTypes" (
    "eventType"
)
VALUES
('Group Hangout'),
('Family Event'),
('Training Event'),
('Mentor Only');


CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "dateTime" TIMESTAMP,
    "dateTimeEnd" TIMESTAMP,
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
CREATE TABLE "resources" (
    "id" SERIAL PRIMARY KEY,
    "resourceName" VARCHAR,
    "resourceDescription" VARCHAR,
    "resourceLink" VARCHAR
);

--admin account and password (must be updated prior to handoff!!!) ---
--
INSERT INTO "user" ("username", "password", "fname", "lname", "userType", "pronouns", "profilePic", "bio", "mentorPair")
VALUES ('ADMIN', '$2a$10$pYczARnREJsyea/SrnO87.hfjlf5DSDAfjfF5NHAClveX2tYPsr26', 'ADMIN', 'ADMIN', '5', 'it/its', NULL, 'ADMIN ACCOUNT', NULL);

-- current admin password: asty. ----


