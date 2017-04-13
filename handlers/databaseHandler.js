"use strict";
var jsonApi = require("jsonapi-server");
var RelationalDbStore = require("jsonapi-store-relationaldb");
var config = require('config');

//module.exports = new jsonApi.MemoryHandler();
module.exports = {
  createHandler: function () {
    return new RelationalDbStore({
      dialect: "postgres",
      host: config.get('database.host'),
      port: config.get('database.port'),
      database: config.get('database.name'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      logging: true
    });
  }
}