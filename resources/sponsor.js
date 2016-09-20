var sponsorHandler = require("../handlers/sponsorHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    title: jsonApi.Joi.string(),
    url: jsonApi.Joi.string().uri()
  }
});
