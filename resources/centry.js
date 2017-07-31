var entryHandler = require("../handlers/databaseHandler.js").createHandler();
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "centry",
  handlers: entryHandler,
  attributes: {
    bib: jsonApi.Joi.string(),
    name: jsonApi.Joi.string(),
    added: jsonApi.Joi.string(),

    campaign: jsonApi.Joi.one('campaigns'),
  },
    examples: [
    {
      id: "1",
      type: "centry",
      bib: "124",
      name: "smith",
      added: '2017-06-18',

      campaign: { type: 'campaigns', id: '1' }
    },
  ]
});

module.exports = {
  handler: entryHandler
}