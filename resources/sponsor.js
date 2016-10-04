var sponsorHandler = require("../handlers/sponsorHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    text: jsonApi.Joi.string(),
    linkUrl: jsonApi.Joi.string().uri(),
    imageUrl: jsonApi.Joi.string().uri()
  },
    examples: [
    {
      id: "sponsor-123",
      type: "sponsors",
      name: "North Face",
      text: "sample text",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    },
    {
      id: "sponsor-456",
      type: "sponsors",
      name: "5 Ten Shoes",
      text: "sample text",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    },
    {
      id: "sponsor-789",
      type: "sponsors",
      name: "World Marathon Majors",
      text: "sample text",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    }
  ]
});
