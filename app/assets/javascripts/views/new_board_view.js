TrelloClone.Views.NewBoardView = Backbone.View.extend({
  template: JST["new_board"],
  tagName: "li",

  events: {
    "submit .new-board" : "addBoard",
    "click .add-board" : "addBoardForm"
  },

  addBoardForm: function(event){
    this.$(".new-board").addClass("showing");
  },

  addBoard: function(event){
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var board = new TrelloClone.Models.Board(params["board"]);
    var boards = this.collection;
    var that = this;
    board.save({}, {
      success: function () {
        boards.add(board);
        that.render();
      }
    });

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
