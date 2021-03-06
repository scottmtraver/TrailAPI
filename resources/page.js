var pageHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "pages",
  handlers: pageHandler,
  attributes: {
    title: jsonApi.Joi.string(),
    content: jsonApi.Joi.string(),
    image_url: jsonApi.Joi.string().uri().allow(null).allow(""),
    video_url: jsonApi.Joi.string().allow(null).allow(""),
    results_url: jsonApi.Joi.string().allow(null).allow(""),
  },
    examples: [
    {
      id: "1",
      type: "pages",
      title: "Homepage",
      content: "Sample Content Here </br> More on another line",
      image_url: "http://placehold.it/350x150",
      video_url: "https://www.youtube.com/watch?v=YxGoCSIzENs",
      results_url: ""
    },
    {
      id: "2",
      type: "pages",
      title: "Series Information",
      content: "Sample Content Here </br> More on another line",
      image_url: "http://placehold.it/350x150",
      video_url: "",
      results_url: ""
    },
    {
      id: "3",
      type: "pages",
      title: "Registration Information",
      content: "Sample Content Here </br> More on another line",
      image_url: "http://placehold.it/350x150",
      video_url: "",
      results_url: ""
    }
  ]
});

module.exports = {
  handler: pageHandler
}