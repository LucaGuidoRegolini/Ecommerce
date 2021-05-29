const express = require("express");
const cors = require("cors");

const router = require("./router");
//const connection = require("./database/conection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;
