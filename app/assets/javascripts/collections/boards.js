TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: TrelloClone.Models.Board,

  getOrFetch: function(id){
    var collection = this;
    var model = this.get(id);
    if(typeof model === "undefined"){
      model = new TrelloClone.Models.Board({id: id});
      model.fetch({
        success: function(){
          collection.add(model);
        }
      });
    } else {
      model.fetch();
    }
    return model;
  }
})
