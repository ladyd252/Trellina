TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  comparator: "ord",
  url: "api/lists",

  initialize: function(model, options){
    this.board = options.board;
  }

});
