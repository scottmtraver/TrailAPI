var sponsorHandler = require("../handlers/sponsorHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "sponsors",
  handlers: sponsorHandler,
  attributes: {
    name: jsonApi.Joi.string(),
    text: jsonApi.Joi.string(),
    linkUrl: jsonApi.Joi.string().uri()
    imageUrl: jsonApi.Joi.string().uri()
  },
    examples: [
    {
      id: "aab14844-97e7-401c-98c8-0bd5ec922d93",
      type: "sponsors",
      name: "Matrix Code",
      text: "sample text",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    },
    {
      id: "aab14844-97e7-401c-98c8-0bd5ec922d93",
      type: "sponsors",
      name: "Another Code",
      text: "sample text",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    },
    {
      id: "aab14844-97e7-401c-98c8-0bd5ec922d93",
      type: "sponsors",
      name: "Final Code",
      text: "sample text",
      linkUrl: "http://www.example.com/foobar",
      imageUrl: "http://www.example.com/foobar",
    }
  ]
});
