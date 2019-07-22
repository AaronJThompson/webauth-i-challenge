
exports.up = function(knex) {
    knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.text('username', 128).unique().notNullable();
        tbl.text('password', 256).notNullable();
    });
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('users');
};
