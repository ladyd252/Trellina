TrelloClone.Views.IndexView = Backbone.CompositeView.extend({
  template: JST["board_index"],
  className: "board-index",

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "remove", this.removeBoard);
    this.listenTo(this.collection, "add", this.addBoard)
    this.addNewBoardView();
    this.collection.each(this.addBoard.bind(this));
  },

  removeBoard: function(board){
    var selector = ".boards";
    var subRemove = _(this.subviews(selector)).find(function(sub){return sub.model === board} );
    this.removeSubview(selector, subRemove);
  },

  addBoard: function(board){
    var boardShow = new TrelloClone.Views.BoardItemView({ model: board, collection: this.collection });
    this.addSubview(".boards", boardShow.render());
  },

  addNewBoardView: function(){
    var newBoardView = new TrelloClone.Views.NewBoardView({collection: this.collection});
    this.addSubview(".boards", newBoardView.render());
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

});
