const express = require("express");
const cors = require("cors");

const router = require("./router");

const app = express();

const connection = require("./database/conection");

app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;
