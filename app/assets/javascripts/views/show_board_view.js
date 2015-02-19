TrelloClone.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST["board_show"],
  className: "board-container",

  events: {
    "sortstop": "saveOrds"
  },

  initialize: function(){
    this.board = this.model;
    this.lists = this.board.lists();
    this.listenTo(this.lists, "add", this.addList);
    this.listenTo(this.board, "sync", this.render);
  },

  addList: function(list){
    this.count = 1;
    var listShow = new TrelloClone.Views.ListShowView({ model: list });
    this.addSubview(".lists", listShow);
  },

  addNewListView: function(){
    var newListView = new TrelloClone.Views.NewListView({board: this.board});
    this.addSubview(".lists", newListView);
  },

  resortSubviews: function() {
    var subviews = this.subviews(".lists");
    subviews.sort(function(subview1, subview2) {
      return subview1.model.get('ord') - subview2.model.get('ord');
    });
  },

  saveOrds: function() {
    var itemElements = this.$(".list-show");
    itemElements.each(function(index, element) {
      var $itemElement = $(element),
          itemId = $itemElement.attr("list-id");
      var item = this.lists.get(itemId);
      if (item.get('ord') === index) {
        return;
      }
      item.save({ord: index});
    }.bind(this));
    this.lists.sort();
    this.resortSubviews();
  },

  render: function(){
    var content = this.template({board: this.board});
    this.$el.html(content);
    this.addNewListView();
    this.lists.each(this.addList.bind(this));
    this.$(".lists").sortable();
    return this;
  }

});
