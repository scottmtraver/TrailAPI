var sponsorHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string().allow(null).allow(""),
    link_url: jsonApi.Joi.string().uri(),
    image_url: jsonApi.Joi.string().uri(),
    is_active: jsonApi.Joi.boolean()
  },
    examples: [
    {
      id: "1",
      type: "sponsors",
      name: "North Face",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
      is_active: true
    },
    {
      id: "2",
      type: "sponsors",
      name: "5 Ten Shoes",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
      is_active: true
    },
    {
      id: "3",
      type: "sponsors",
      name: "World Marathon Majors",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
      is_active: true
    }
  ]
});

module.exports = {
  handler: sponsorHandler
}