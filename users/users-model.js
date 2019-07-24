const db = require('../data/dbConfig');

module.exports = {
    add,
    findByID,
    findByUsername,
    find
}

function add(username, password) {
    return db('users')
        .insert({username, password})
        .then(ids => ids[0]);
}

function findByID(id) {
    return db('users')
        .where({id: Number(id)}); 
}

function find() {
    return db('users')
        .select(['id', 'username']);
}

function findByUsername(username) {
    return db('users')
        .where({username});
}