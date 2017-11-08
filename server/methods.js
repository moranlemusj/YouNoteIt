//methods that can be called from client side
Meteor.methods({
  addNote(note, time) {
    Notes.insert({
      text: note,
      complete: false,
      createdAt: new Date(),
      seconds: time,
      user: 'ZeroBrane',
      video: 'LvlUp Tutorial',
    });
  }
});