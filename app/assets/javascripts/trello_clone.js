window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TrelloClone.Routers.TrelloRouter({
      "$rootEl" : $("#main")
    });
    Backbone.history.start();
  }
};
