Notes = new Mongo.Collection("notes");
//if susbscribe to allNotes, gives me all notes.
Meteor.publish('allNotes', function() {
  return Notes.find({seconds:10});
})

Meteor.publish('usersNotes', function(video) {
  return Notes.find({user: this.userId, video: video});
})