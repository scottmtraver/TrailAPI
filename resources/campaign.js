var campaignHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "campaigns",
  handlers: campaignHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    video_url: jsonApi.Joi.string(),
    is_active: jsonApi.Joi.boolean()
  },
    examples: [
    {
      id: "1",
      type: "campaigns",
      name: "North Face",
      video_url: "http://www.example.com/foobar",
      is_active: true
    },
  ]
});

module.exports = {
  handler: campaignHandler
}