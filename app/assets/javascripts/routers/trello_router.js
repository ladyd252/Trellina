TrelloClone.Routers.TrelloRouter = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.boards = new TrelloClone.Collections.Boards();
    this.boards.fetch();
  },

  routes: {
    "": "boardIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
    "boards/:id/lists/:id": "listShow"
  },

  boardIndex: function(){
    var indexView = new TrelloClone.Views.IndexView({ collection: this.boards });
    this._swapView(indexView);
  },

  boardNew: function(){
    var newBoardView = new TrelloClone.Views.NewBoardView({collection: this.boards});
    this._swapView(newBoardView);
  },

  boardShow: function(id){
    var board = this.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShowView({ model: board });
    this._swapView(showView)
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

})
