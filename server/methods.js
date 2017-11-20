
//methods that can be called from client side
import { HTTP } from 'meteor/http';

const callService = (type, url, options) => new Promise((resolve, reject) => {
  HTTP.call(type, url, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

Meteor.methods({
  addNote(note, time, video, title, vidId, update) {
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
      vidId: vidId,
      update: update

    }, {sort: {seconds: -1}});
  },
  deleteNote(note) {
    if(Meteor.userId() !== note.user) {
      throw new Meteor.Error('Unauthorized');
    }
    console.log(note);
    Notes.remove(note._id);
  },
  updateText(id, text){
    Notes.update(id, {
      $set: {text: text}
    })
  },
  getVideoData(url) {
    return callService(
      'GET',
      `https://www.googleapis.com/youtube/v3/videos?id=${url}&key=AIzaSyBRrQmXEXUOOYkXW_sa7Gd5dGJJkEbiT_Q&fields=items(snippet)&part=snippet`)
      .then((result) => result).catch((error) => {
        throw new Meteor.Error('500', `${error.message}`)
      })
  }
});
