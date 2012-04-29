TypeAheadHelper = function(searcher) {
  this._searcher = searcher;
}

TypeAheadHelper.prototype = {
  
  query: function(query) {
    Session.set('typeAheadIsLoading', true);
    this._searcher.search(query, function(error, results) {
      Session.set('typeAheadIsLoading', false);
      if(error)
        return; // Do nothing, yet.
      if (results.length == 0)
        return; // Don't replace with empty

      Session.set('typeAheadSelectedIndex', 0)
      Session.set('typeAheadResults', results.slice(0, 5));
    })
  },

  isLoading: function() {
    return !!Session.get('typeAheadIsLoading');
  },

  isSelected: function(item) {
    var results = Session.get('typeAheadResults');
    if (!results) return false;
    var selected = results[Session.get('typeAheadSelectedIndex')];
    return item == selected;
  },

  selectNext: function() {
    this._moveIndex(+1);
  },

  selectPrevious: function() {
    this._moveIndex(-1);
  },

  results: function() {
    return Session.get('typeAheadResults');
  },
  
  _moveIndex: function(delta) {
    var newIndex = Session.get('typeAheadSelectedIndex') + delta;
    var results = Session.get('typeAheadResults');
    if(results && results[newIndex])
      Session.set('typeAheadSelectedIndex', newIndex)  
  }  
}