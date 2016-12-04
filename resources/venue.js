var venueHandler = require("../handlers/venueHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "venues",
  handlers: venueHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    directions_url: jsonApi.Joi.string().uri(),
    link_url: jsonApi.Joi.string().uri(),
    image_url: jsonApi.Joi.string().uri(),

    races: jsonApi.Joi.belongsToMany({
      resource: 'races',
      as: 'venue'
    }),
  },
    examples: [
    {
      id: "1",
      type: "venues",
      name: "Big Venue",
      description: "sample text",
      directions_url: "http://www.example.com/foobar",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150"
    },
    {
      id: "2",
      type: "venues",
      name: "Medium Venue",
      description: "sample text",
      directions_url: "http://www.example.com/foobar",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
    },
    {
      id: "3",
      type: "venues",
      name: "Tiny Track",
      description: "sample text",
      directions_url: "http://www.example.com/foobar",
      link_url: "http://www.example.com/foobar",
      image_url: "http://placehold.it/350x150",
    }
  ]
});
