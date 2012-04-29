Template.createPlaylist.viewClass = function () {
  return currentPlaylist() ? 'hidden' : '';
}

Template.createPlaylist.events = {
  'click .do' : function (e) {
    var playlist = player.create($('#createPlaylistView .name').val());
    Meteor.router.navigate("p/" + playlist.name_simple + "/", {trigger: true});
  }
};