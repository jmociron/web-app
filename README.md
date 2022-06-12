## CMSC 100 - Exercise 10
* Web application with sign-up, log-in, and feed
* Made with Firefox as browser

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

### Navigating the feed
* Left column contains friends list, incoming/outgoing friend requests, and all other users.
* The user may add another user as friend, or confirm/reject friend their request.
* Middle column contains posts from user and from the user's friends.
* Right column contains the search bar where the user may search and view other users' profiles. 
* The user may input either another user's full name, first name, or last name. Other users with the same first or last name may appear as well.
