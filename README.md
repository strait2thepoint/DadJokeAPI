# Groan Zone
The Groan Zone is a website with a simple, blog-like layout. The content is intended to be all "dad jokes". The site is organized by posts, which can each be upvoted or downvoted by visitors.

<hr>

![Express.js](https://img.shields.io/badge/Express.js-4.17.1-blue.svg)
![Handlebars.js](https://img.shields.io/badge/Handlebars.js-4.7.7-blue.svg)
![Normalize.css](https://img.shields.io/badge/Normalize.css-8.0.1-blue.svg)

<hr>

# Description
When visitors enter the Groan Zone, they are greeted with a splash page, that shows the top five "dad jokes" of the day. From there, they can navigate to the login page, or to a page that lists all jokes, in order of chronological creation.

Visitors can register a user account, or login to a pre-existing account. Registered users can post a joke, which is then subject to upvoting and downvoting.

<hr>

## Table of Contents

 *  [Installation](#installation)
 *  [Usage](#usage)
 *  [Screenshot](#screenshot)
 *  [Testing](#testing)



## Installation
1. Install Node.js v16.
2. Intsatll Mysql 8.0
3. Install inquirer, please use npm i inquirer@8.2.4
4. To connect with database, create file .env to store username, database name and password.
5. Run command npm install.
6. Navigate to db directory and run command "SOURCE schema.sql";
7. Navigate to seeds directory and run "node seeds/seed.js";
8. Now restart server by using command "npm start"

## Usage

The repository is available at:

https://github.com/strait2thepoint/DadJokeAPI


## Testing

1. Stop server by using command "ctrl c"
2. Navigate to db directory and run command "SOURCE schema.sql";
3. Navigate to seeds directory and run "node seeds/seed.js";
4. Now restart server by using command "npm start"

## License

GNU General Public License v3.0 [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


