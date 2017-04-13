var cardHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "cards",
  handlers: cardHandler,
  attributes: {
    title: jsonApi.Joi.string().allow(null).allow(""),
    content: jsonApi.Joi.string().allow(null).allow(""),
    image_url: jsonApi.Joi.string().uri(),
    is_active: jsonApi.Joi.boolean()
  },
    examples: [
    {
      id: "1",
      type: "cards",
      title: "My First Card",
      content: "Sample Content Here </br> More on another line",
      image_url: "http://placehold.it/350x150",
      is_active: true
    },
    {
      id: "2",
      type: "cards",
      title: "My Second Card",
      content: "Sample Content Here </br> More on another line",
      image_url: "http://placehold.it/350x150",
      is_active: true
    },
    {
      id: "3",
      type: "cards",
      title: "My Third Card",
      content: "Sample Content Here </br> More on another line",
      image_url: "http://placehold.it/350x150",
      is_active: false
    }
  ]
});

module.exports = {
  handler: cardHandler
}