const express = require("express");
const TarifRouter = require("../tarif/tarif-router");

const server = express();

server.use(express.json());
server.use("/api/tarifler", TarifRouter);

module.exports = server;
