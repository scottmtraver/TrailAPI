var venueHandler = require("../handlers/venueHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "venues",
  handlers: venueHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    directionsUrl: jsonApi.Joi.string().uri(),
    linkUrl: jsonApi.Joi.string().uri(),
    imageUrl: jsonApi.Joi.string().uri(),

    races: jsonApi.Joi.belongsToMany({
      resource: 'races',
      as: 'venue'
    }),
  },
    examples: [
    {
      id: "venue-123",
      type: "venues",
      name: "Big Venue",
      description: "sample text",
      directionsUrl: "http://www.example.com/foobar",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar"
    },
    {
      id: "venue-456",
      type: "venues",
      name: "Medium Venue",
      description: "sample text",
      directionsUrl: "http://www.example.com/foobar",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    },
    {
      id: "venue-789",
      type: "venues",
      name: "Tiny Track",
      description: "sample text",
      directionsUrl: "http://www.example.com/foobar",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    }
  ]
});
