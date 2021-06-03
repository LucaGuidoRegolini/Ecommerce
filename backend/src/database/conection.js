const knex = require("knex");
const config = require("../../knexfile");

const env = config.docker;

const connection = knex(env);

module.exports = connection;
