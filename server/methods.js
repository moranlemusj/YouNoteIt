//methods that can be called from client side
Meteor.methods({
  addNote(note, time, video, title, vidId) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('Sign in please!');
    }
    if(!video || ! title) {
      throw new Meteor.Error('Please link a video before adding notes!');
    }

    Notes.insert({
      title: title,
      text: note,
      createdAt: new Date(),
      seconds: time,
      user: Meteor.userId(),
      video: video,
      vidId: vidId

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