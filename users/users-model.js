const db = require('../data/dbConfig');

function add(username, password) {
    return db('users')
        .insert({username, password})
        .then(ids => ids[0]);
}

function findByID(id) {
    return db('users')
        .where({id: Number(id)}); 
}

function findByUsername(username) {
    return db('users')
        .where({username});
}