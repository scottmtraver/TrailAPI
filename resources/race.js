var raceHandler = require("../handlers/raceHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "races",
  handlers: raceHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    date: jsonApi.Joi.string(),
    registration_time: jsonApi.Joi.string(),
    start_time: jsonApi.Joi.string(),
    cost: jsonApi.Joi.string(),
    distance: jsonApi.Joi.string(),
    image_url: jsonApi.Joi.string().uri(),
    results_url: jsonApi.Joi.string().uri(),
    course_url: jsonApi.Joi.string().uri(),
    course_text: jsonApi.Joi.string(),

    venue: jsonApi.Joi.one('venues')
  },
  examples: [
    {
      id: "race_123",
      type: "races",
      name: "First Race of the Season!",
      description: "This is the first race description",
      date: "2016-10-13",
      registration_time: "6:45",
      start_time: "7:30",
      cost: "$20",
      distance: "Short 5k and Long 10K courses",
      image_url: "https://placekitten.com/400/400",
      results_url: "http://www.example.com/image",
      course_url: "http://www.example.com/image",
      course_text: "Up and down those hills",

      venue: { type: 'venues', id: 'venue_123' }
    }
  ]
});
