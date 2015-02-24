TrelloClone.Views.CardShowView = Backbone.View.extend({
  template: JST["card_show"],
  className: "card-show",

  events:{
    "click .delete-card" : "deleteCard"
  },

  initialize: function(){
    this.$el.attr("card-id", this.model.id)
    this.listenTo(this.model, "sync change", this.render);
  },

  deleteCard: function(event){
    event.stopPropagation();
    this.model.delete();
  },

  render: function(){
    var content = this.template({card: this.model});
    this.$el.html(content);
    return this;
  }

});
