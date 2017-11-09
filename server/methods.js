//methods that can be called from client side
Meteor.methods({
  addNote(note, time, video) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('Sign in please!');
    }

    Notes.insert({
      text: note,
      complete: false,
      createdAt: new Date(),
      seconds: time,
      user: Meteor.userId(),
      video: video,
    });
  },
  deleteNote(note) {
    if(Meteor.userId() !== note.user) {
      throw new Meteor.Error('Unauthorized');
    }
    console.log(note);
    Notes.remove(note._id);
  }
});