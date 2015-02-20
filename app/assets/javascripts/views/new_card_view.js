TrelloClone.Views.NewCardView = Backbone.View.extend({
  template: JST["new_card"],
  events: {
    "submit .new-card" : "addCard",
    "click .display-card-form" : "showCardForm"
  },

  initialize: function(options){
    this.list = options.list;
  },

  showCardForm: function(event){
    this.$(".new-card").addClass("showing");
  },


  addCard: function(){
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var card = new TrelloClone.Models.Card(params["card"]);
    card.set({list_id: this.list.id});
    var cards = this.list.cards();
    var that = this;
    card.save({}, {
      success: function () {
        cards.add(card);
        that.render();
      }
    });
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});
