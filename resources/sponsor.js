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
      id: "1",
      type: "sponsors",
      name: "North Face",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
    },
    {
      id: "2",
      type: "sponsors",
      name: "5 Ten Shoes",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
    },
    {
      id: "3",
      type: "sponsors",
      name: "World Marathon Majors",
      description: "sample description",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
    }
  ]
});
