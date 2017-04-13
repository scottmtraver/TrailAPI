var raceHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "races",
  handlers: raceHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string().allow(null).allow(""),
    date: jsonApi.Joi.string(),
    registration_time: jsonApi.Joi.string(),
    start_time: jsonApi.Joi.string(),
    cost: jsonApi.Joi.string(),
    distance: jsonApi.Joi.string(),
    image_url: jsonApi.Joi.string().uri().allow(null).allow(""),// this is the course image
    results_url: jsonApi.Joi.string().uri().allow(null).allow(""),
    course_url: jsonApi.Joi.string().uri().allow(null).allow(""),
    course_description: jsonApi.Joi.string().allow(null).allow(""),

    venue: jsonApi.Joi.one('venues'),
    sponsor: jsonApi.Joi.one('sponsors').allow(null)
  },
  examples: [
    {
      id: "1",
      type: "races",
      name: "First Race of the Season!",
      description: "This is the first race description",
      date: "2016-10-13",
      registration_time: "6:45",
      start_time: "7:30",
      cost: "$20",
      distance: "Short 5k and Long 10K courses",
      image_url: "http://placehold.it/350x150",
      results_url: "http://www.example.com/image",
      course_url: "http://www.example.com/image",
      course_description: "Up and down those hills",

      venue: { type: 'venues', id: '1' },
      sponsor: { type: 'sponsors', id: '1' }
    }
  ]
});
