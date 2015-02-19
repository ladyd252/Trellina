TrelloClone.Views.ListShowView = Backbone.CompositeView.extend({
  template: JST["list_show"],
  className: "list-show",

  initialize: function(){
    this.$el.attr("list-id", this.model.id)
    this.list = this.model;
    this.cards = this.list.cards();
    this.listenTo(this.cards, "add", this.addCard);
    this.listenTo(this.list, "sync change", this.render)
  },

  addCard: function(card){
    var cardShow = new TrelloClone.Views.CardShowView({ model: card });
    this.addSubview(".cards", cardShow);
  },

  addNewCardView: function(){
    var newCardView = new TrelloClone.Views.NewCardView({list: this.list});
    this.addSubview(".new-cards", newCardView);
  },

  render: function(){
    var content = this.template({list: this.list});
    this.$el.html(content);
    this.renderCards();
    this.addNewCardView();
    // this.$(".cards").sortable( "option", "connectWith", ".cards");
    return this;
  },

  renderCards: function () {
   this.cards.each(this.addCard.bind(this));
   this.$('.cards').sortable({connectWith: '.cards'});
 },


});
