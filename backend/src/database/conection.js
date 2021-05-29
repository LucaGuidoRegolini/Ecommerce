const Squelize = require("sequelize");
const config = require("../config/database");

const env = config.development;

const connection = new Squelize(config);

module.exports = connection;
