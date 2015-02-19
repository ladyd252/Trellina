TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: "api/cards",

  initialize: function(model, options){
    this.list = options.list;
  }
});
