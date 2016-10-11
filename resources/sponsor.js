var sponsorHandler = require("../handlers/sponsorHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    text: jsonApi.Joi.string(),
    link_url: jsonApi.Joi.string().uri(),
    image_url: jsonApi.Joi.string().uri()
  },
    examples: [
    {
      id: "sponsor-123",
      type: "sponsors",
      name: "North Face",
      text: "sample text",
      link_url: "http://www.example.com/foobar",
      image_url: "http://www.example.com/foobar",
    },
    {
      id: "sponsor-456",
      type: "sponsors",
      name: "5 Ten Shoes",
      text: "sample text",
      link_url: "http://www.example.com/foobar",
      image_url: "http://www.example.com/foobar",
    },
    {
      id: "sponsor-789",
      type: "sponsors",
      name: "World Marathon Majors",
      text: "sample text",
      link_url: "http://www.example.com/foobar",
      image_url: "http://www.example.com/foobar",
    }
  ]
});
