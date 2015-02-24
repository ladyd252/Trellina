TrelloClone.Views.ListShowView = Backbone.CompositeView.extend({
  template: JST["list_show"],
  className: "list-show",
  events: {
    "sortstop": "saveOrds",
    "sortreceive": "receiveCard",
  },

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
    return this;
  },

  resortSubviews: function() {
    var subviews = this.subviews(".cards");
    subviews.sort(function(subview1, subview2) {
      return subview1.model.get('ord') - subview2.model.get('ord');
    });
  },

  receiveCard: function(event,ui){
    var cardId = ui.item.attr("card-id");
    var newOrd = ui.item.index();
    var card = new TrelloClone.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    card.save();
    this.cards.add(card, {silent: true});
    this.saveOrds(event);
  },

  saveOrds: function(event) {
    event.stopPropagation();
    var itemElements = this.$(".card-show");
    itemElements.each(function(index, element) {
      var $itemElement = $(element),
          itemId = $itemElement.attr("card-id");
      var item = this.cards.get(itemId);
      if (item.get('ord') === index) {
        return;
      }
      item.save({ord: index});
    }.bind(this));
    this.cards.sort();
    this.resortSubviews();
  },


  renderCards: function () {
   this.cards.each(this.addCard.bind(this));
   this.$('.cards').sortable({connectWith: '.cards'});
 },


});
