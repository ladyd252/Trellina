# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.extract! @board, :id, :title

json.lists do
  json.array! @board.lists do |list|
    json.id list.id
    json.title list.title
    json.ord list.ord
    json.board_id list.board_id
    json.cards do
      json.array! list.cards, :list_id, :id, :title, :description, :ord
    end
  end
end
