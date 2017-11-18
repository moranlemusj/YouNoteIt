import React from 'react';
import ReactDOM from 'react-dom';
//allows for data handling
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Keypress from 'react-keypress';

import NoteForm from './NoteForm.jsx';
import NoteSingle from './NoteSingle.jsx';
import VideoForm from './VideoForm.jsx';
// substitute resolution with note
Notes = new Mongo.Collection('notes');


export default class NotesContainer extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state =  {
      subscription: {
        notes: Meteor.subscribe("usersNotes", '')
      },
      currentVideo: '',
      player: null,
      time: 0,
      gap: 0,
      startRecord: 0,
      noteValue: '',
    }
    this.togglePlayEventListener = Keypress("cmd /", this.stopV.bind(this));
  }

  statePlayerMe() {
    return this.state.player;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const gap = Date.now() - this.state.startRecord;
    console.log('GAP', gap, Date.now(), this.state.startRecord);
    this.setState({
      startRecord : 0,
      noteValue: ''
    });
    let vidId = this.state.id;
    let title = this.state.title;
    let text = this.state.noteValue.trim();
    let secs = Math.round(this.state.player.getCurrentTime() - (gap / 1000));
    let time = (secs > 0) ? secs : 0;
    let video = this.state.currentVideo;
    let update = false;
    Meteor.call('addNote', text, time, video, title, vidId, update, (error, data) => {
      if (error) {
        Bert.alert('Invalid link!', 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        this.setState({
          noteValue: ''
        });
      }
    });
  }
  recordText = (e) => {
    if (!this.state.startRecord) this.setState({
      startRecord : Date.now(),
    });
    this.setState({
      noteValue: e.target.value
    });
  }

  stopV() {
    let self = this.statePlayerMe();
    if (self.getPlayerState() === 1) {
      self.pauseVideo();
    } else {
    self.playVideo();
    }
  }

  componentWillMount() {
    if(this.state && this.state.subscription) {
      this.state.subscription.notes.stop();
    }
    document.addEventListener('keydown', this.togglePlayEventListener);
  }

  componentWillUnmount() {
    this.state.subscription.notes.stop();
    document.removeEventListener('keydown', this.togglePlayEventListener);
    this.setState({
      notes: Meteor.subscribe("usersNotes", ''),
      currentVideo: '',
    })
  }

  setVideo(url) {
    if (!this.state.currentVideo) {
      this.state.subscription.notes.stop();
      //test without this
      FlowRouter.go(`/single/${url}`)
      this.setState({
        notes: Meteor.subscribe("usersNotes", url),
        currentVideo: url,
      })
    }
  }

  notes() {
    //fetch gives object, find a cursor;
    return Notes.find().fetch();
  }

  setPlayer = (player) => {
    this.setState({ player });
  }

  setVideoData = (title, author) => {
    this.setState({title, author});
  }

  render() {
    return (
      <div>
        {(this.state.player && this.props.id) ?
            <div>
              <h1> {this.state.title} </h1>
              <h4> {this.state.author}</h4>
            </div> : <h1>Enter video url</h1>}
        <VideoForm className = 'circular'
                   setVideo = {this.setVideo.bind(this)}
                   initialUrl = {this.props.id}
                   onSetPlayer={this.setPlayer}
                   setVideoData = {this.setVideoData} />
        <br />
        <br />
        <NoteForm className = 'circular'
                  player = {this.state.player}
                  id = {this.props.id}
                  typedStr={this.recordText}
                  text={this.state.noteValue}
                  onSubmit={this.onSubmit}
                  />

        {(this.state.player && this.props.id) ?
          <div className = 'rewind'>
            <div className = 'title'><h3> Notes for Video</h3></div>
          </div> :
        <div>

        </div>}
        <ul className = "notes">
          {(this.state.player && this.props.id) ? this.notes().reverse().map( note =>
            <NoteSingle key = {note._id}
                        note = {note}
                        player = {this.state.player} />
          ) : <div></div> }
        </ul>
      </div>
    )
  }
}
