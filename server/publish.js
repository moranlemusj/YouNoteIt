Notes = new Mongo.Collection("notes");
//if susbscribe to allNotes, gives me all notes.
Meteor.publish('allNotes', function() {
  return Notes.find({seconds:10});
})