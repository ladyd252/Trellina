TrelloClone.Views.NewListView = Backbone.View.extend({
  template: JST["new_list"],
  className: "new-list-form",
  events: {
    "submit .new-list" : "addList",
    "click .display-list-form" : "addListForm"
  },

  initialize: function(options){
    this.board = options.board;
  },

  addListForm: function(event){
    this.$(".new-list").addClass("showing");
  },

  addList: function(event){
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var list = new TrelloClone.Models.List(params["list"]);
    list.set({board_id: this.board.id });
    var lists = this.board.lists();
    var that = this;
    list.save({}, {
      success: function (){
        lists.add(list);
        that.render();
      }
    })
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});
