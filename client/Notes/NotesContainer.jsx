import React from 'react';
import ReactDOM from 'react-dom';
//allows for data handling
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import NoteForm from './NoteForm.jsx';
import NoteSingle from './NoteSingle.jsx';
import VideoForm from './VideoForm.jsx';
// substitute resolution with note
Notes = new Mongo.Collection('notes');


export default class NotesContainer extends TrackerReact(React.Component) {
  constructor() {
    super();
    
    this.state =  {
      //"notes:" doesn't matter
      subscription: {
        notes: Meteor.subscribe("usersNotes", '')
      },
      currentVideo: '',
      player: {},
      time: 0,
    }
  }

  componentWillUnmount() {
    this.state.subscription.notes.stop();
  }

  setVideo(url) {
    this.state.subscription.notes.stop();
    this.setState({...this.state,
      notes: Meteor.subscribe("usersNotes", url),
      currentVideo: url,
    })
  }

  getVideo(player) {
    this.setState({...this.state,
      player: player
    });
  }

  getTime(seconds) {

  }

  notes() {
    //fetch gives object, find a cursor;
    return Notes.find().fetch();
  }

  render() {
    return (
      <div>
        <h1>PadTube</h1>
        <VideoForm getVideo = {this.getVideo.bind(this)} 
                   setVideo = {this.setVideo.bind(this)} 
                   getTime = {this.getTime.bind(this)} />
        <br />
        <br />
        <NoteForm video = {this.state.currentVideo} 
                  time = {this.state.time} 
                  player = {this.state.player} />
        <h3> Notes for Video </h3>
        <ul className = "notes">
          {this.notes().reverse().map( note => 
            <NoteSingle key = {note._id} 
                        note = {note} 
                        player = {this.state.player} />
          )}
        </ul>
      </div>
    )
  } 
}
