const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const cookieParser = require('cookie-parser');
const server = express();

server.use(cookieParser());
server.use(session({
  name: 'sessionID',
  secret: 'verylongsession',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: require('./data/dbConfig'), // configured instance of knex
    tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
    sidfieldname: 'sid', // column that will hold the session id, name it anything you want
    createtable: true, // if the table does not exist, it will create it automatically
    clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
  }),
}));

const userRouter = require('./users/users-router');
server.use(express.json());

server.use('/api', userRouter);

server.listen(4000, () => {
    console.log('Listening on port 4000');
})