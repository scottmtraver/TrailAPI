var sponsorHandler = require("../handlers/sponsorHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    title: jsonApi.Joi.string(),
    url: jsonApi.Joi.string().uri()
  },
    examples: [
    {
      id: "aab14844-97e7-401c-98c8-0bd5ec922d93",
      type: "sponsors",
      title: "Matrix Code",
      url: "http://www.example.com/foobar",
    },
    {
      id: "aab14844-97e7-401c-98c8-0bd5ec922d93",
      type: "sponsors",
      title: "Another Code",
      url: "http://www.example.com/foobar",
    },
    {
      id: "aab14844-97e7-401c-98c8-0bd5ec922d93",
      type: "sponsors",
      title: "Final Code",
      url: "http://www.example.com/foobar",
    }
  ]
});
