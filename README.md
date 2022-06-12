## CMSC 100 - Exercise 10
* Web application with sign-up, log-in, and feed
* Made with Firefox

### Running MongoDB server
    cd C:\Program Files\MongoDB\Server\5.0\bin (locate MongoDB in Program Files)
    mongod

### Navigating the EXER10 database
    mongosh
    show dbs
    use EXER10

### Running the web app
    npm start (on .\back-end\ and .\front-end\)

### Creating a user
* Email address must be valid.
* Password must be at least 8 characters, containing at least 1 number, at least 1 lowercase character, and at least 1 uppercase letter.
