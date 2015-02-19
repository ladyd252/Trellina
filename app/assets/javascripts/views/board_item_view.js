TrelloClone.Views.BoardItemView = Backbone.View.extend({
  template: JST["board_item"],
  tagName: "li",

  events: {
    "click .delete-board" : "deleteBoard"
  },

  initialize: function(){
    this.listenTo(this.model, "change", this.render)
  },

  deleteBoard: function(event){
    this.model.destroy();
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  }
});
