TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: "api/cards",
  comparator: "ord",

  initialize: function(model, options){
    this.list = options.list;
  }
});
