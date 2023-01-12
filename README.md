# QUEERSPACE hangouts

Duration: 2 Week Sprint

QUEERSPACE collective hangouts is an events calendar application that allows users to view and register for upcoming QUEERSPACE collective hosted events. Admin features include the ability to create, edit, and delete events and users, as well as securely register new users with assigned user types (e.g. mentee, mentor, volunteer, etc.)


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


## Installation Instructions

- Fork the repository
- Copy the SSH key in your new repository
- In your terminal, run the command  `git clone {paste SSH link}`
- Navigate into the repository's folder in your terminal
- Open VS Code (or editor of your choice) and open the folder
- In your VS Code termanl, run `npm install` to install all dependencies
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure.
- Create a database named `queerspace_collective` in PostgresSQL. If you would like to name your database something else, you will need to change animal_connections to the name of your new database name in server/modules/pool.js
You can also - 
  - Create a new database by running the following commands in your terminal:

```
        createdb queerspace_collective
        sql -d queerspace_collective -f database.sql
```
- In your VS code terminal, run `npm run server`
- Open up a second terminal and run `npm run client`
- Navigate to `localhost:3000`


## Usage

Once installation is complete and application is running in default browser, 
watch this video walkthrough for usage: 
[demo video]


## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy


## Technologies Used:

- JavaScript
- Node.js
- Express
- React.js
- Redux
- PostgreSQL
- Nodemailer
- Multer
- Fuse.js
- HTML
- CSS
- Material UI 


## Acknowledgements

Thanks to Prime Digital Academy, who equipped us with the tools to make this application a reality. Thank you to the staff at QUEERSPACE collective with entrusting us with this project and allowing us to contribute to their important work.