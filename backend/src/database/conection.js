const knex = require("knex");
const config = require("../../knexfile");

const env = config.docker;

const connection = knex(env);
console.log(">Conection run");

module.exports = connection;
