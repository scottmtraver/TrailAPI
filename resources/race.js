var raceHandler = require("../handlers/raceHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "races",
  handlers: raceHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    date: jsonApi.Joi.string(),
    registrationTime: jsonApi.Joi.string(),
    startTime: jsonApi.Joi.string(),
    cost: jsonApi.Joi.string(),
    distance: jsonApi.Joi.string(),
    imageUrl: jsonApi.Joi.string().uri(),
    resultsUrl: jsonApi.Joi.string().uri(),
    courseUrl: jsonApi.Joi.string().uri(),
    courseText: jsonApi.Joi.string(),
  },
  examples: [
    {
      id: "97e7-401c-98c8-0bd5ec922d93",
      type: "races",
      name: "First Race of the Season!",
      description: "This is the first race description",
      date: "2016-01-03",
      registrationTime: "6:45",
      startTime: "7:30",
      cost: "$20",
      distance: "Short 5k and Long 10K courses",
      imageUrl: "http://www.example.com/image",
      resultsUrl: "http://www.example.com/image",
      courseUrl: "http://www.example.com/image",
      courseText: "Up and down those hills"
    }
  ]
});
