"use strict";
var jsonApi = require("jsonapi-server");
var RelationalDbStore = require("jsonapi-store-relationaldb");

//module.exports = new jsonApi.MemoryHandler();
module.exports = {
  createHandler: function () {
    return new RelationalDbStore({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: process.env.PG_PORT, 
      database: process.env.PG_DBNAME,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      logging: true
    });
  }
}