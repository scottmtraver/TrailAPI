"use strict";
var jsonApi = require("jsonapi-server");
var RelationalDbStore = require("jsonapi-store-relationaldb");

//module.exports = new jsonApi.MemoryHandler();
module.exports = new RelationalDbStore({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: "runontrailsdb", // If not provided, defaults to the name of the resource
    username: "scott",
    password: "One23456!",
    logging: true
  });
