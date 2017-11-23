import Notes from './notes'
//if susbscribe to allNotes, gives me all notes.

Meteor.publish('usersVideos', function() {
  return Notes.find({user: this.userId});
})

Meteor.publish('usersNotes', function(video) {
  return Notes.find({user: this.userId, video: video}, {sort: {seconds: -1}});
})
