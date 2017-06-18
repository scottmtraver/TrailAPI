var photoHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "photos",
  handlers: photoHandler,
  attributes: {
    image_url: jsonApi.Joi.string().uri(),
    is_active: jsonApi.Joi.boolean(),
    date: jsonApi.Joi.string()
  },
    examples: [
    {
      id: "1",
      image_url: "http://placehold.it/350x150",
      is_active: true,
      date: '2017-06-21',
    },
    {
      id: "2",
      image_url: "http://placehold.it/350x150",
      is_active: true,
      date: '2017-06-21'
    },
    {
      id: "3",
      image_url: "http://placehold.it/350x150",
      is_active: false,
      date: '2017-06-21'
    }
  ]
});

module.exports = {
  handler: photoHandler
}