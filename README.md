# backend-assignment-weframe

## PROJECT SETUP

## Local Environment Setup

- [Git](https://git-scm.com/)
- [Node.js v18.7.0](https://nodejs.org/en/)
- [NPM v8.3.0](https://www.npmjs.com/)
- [MongoDB Driver](https://www.mongodb.com/)
- [Mongoose v7.5.2](https://mongoosejs.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Jest Testing Framework](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)

## Environment Variables for Local Development

> Create a .env file and adjust the following environment variables. DONOT include the file in the source control.

```bash
# Application PORT
PORT=<value>

# MongoDB
DATABASE=<value>
DB_PASS=<value>

# Cookie secret
COOKIE_SECRET=<value>

# JWT Access Token secret and Expiration time
JWT_SECRET=<value>
```

> Create a database in MongoDB named task-manager

## NPM Scripts

```bash
$ npm install          # install dependencies
$ npm start            # development build
$ npm test             # development test
```

## API Documentation

Go to `http://localhost:5000/api-docs` for Swagger Documentation of the API.
