var sponsorHandler = require("../handlers/sponsorHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    link_url: jsonApi.Joi.string().uri(),
    image_url: jsonApi.Joi.string().uri()
  },
    examples: [
    {
      id: "sponsor-123",
      type: "sponsors",
      name: "North Face",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "https://placekitten.com/400/400",
    },
    {
      id: "sponsor-456",
      type: "sponsors",
      name: "5 Ten Shoes",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "https://placekitten.com/400/400",
    },
    {
      id: "sponsor-789",
      type: "sponsors",
      name: "World Marathon Majors",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "https://placekitten.com/400/400",
    }
  ]
});
