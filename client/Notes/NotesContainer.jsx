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
      //"notes:" doesn't matter
      subscription: {
        notes: Meteor.subscribe("usersNotes", '')
      },
      currentVideo: '',
      player: null,
      time: 0,
    }

    this.togglePlayEventListener = Keypress("cmd /", this.stopV.bind(this));
  }

  stopV() {
    if (this.state.player.getPlayerState() === 1) {
      this.state.player.pauseVideo();
    } else {
    this.state.player.playVideo();
    }
  }

  componentWillMount() {
    console.log('[banana] will', this.state, this.state.subscription)
    if(this.state && this.state.subscription) {
      this.state.subscription.notes.stop();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.togglePlayEventListener)
  }
  
  componentWillUnmount() {
    console.log('[banana]', 'here');
    this.state.subscription.notes.stop();
    this.setState({
      notes: Meteor.subscribe("usersNotes", ''),
      currentVideo: '',
    })
    document.removeEventListener('keydown', this.togglePlayEventListener);
  }

  setVideo(url) {
    if (!this.state.currentVideo) {
      this.state.subscription.notes.stop();
      console.log('[banana] set', url, this.state);
      FlowRouter.go(`/single/${url}`)
      this.setState({
        notes: Meteor.subscribe("usersNotes", url),
        currentVideo: url,
      })
    }
    console.log('[banana] set after', url, this.state);
  }

  notes() {
    //fetch gives object, find a cursor;
    return Notes.find().fetch();
  }
  
  setPlayer = (player) => {
    this.setState({ player });
  }
  
  render() {
    return (
      <div>
        {(this.state.player && this.props.id) ? 
            <div> 
              <h1> {this.state.player.getVideoData().title} </h1>
              <h4> {this.state.player.getVideoData().author}</h4>
            </div> : <h1>Enter video url</h1>}
        <VideoForm setVideo = {this.setVideo.bind(this)} 
                   initialUrl = {this.props.id}
                   player={this.state.player}
                   onSetPlayer={this.setPlayer} />
        <br />
        <br />
        <NoteForm video = {this.state.currentVideo} 
                  time = {this.state.time} 
                  player = {this.state.player}
                  id = {this.props.id} />
        {(this.state.player && this.props.id) ? <h3> 'Notes for Video'</h3> :
        <div>
          <div className = "comicRow">
            <img src="./images/1.jpg" height="200" />
            <img src="./images/2.jpg" height="200" />
          </div>
          <div className = "comicRow">
            <img src="./images/3.jpg" height="200" />
            <img src="./images/4.jpg" height="200" />
          </div>
        </div>}
        <ul className = "notes">
          {this.state.currentVideo ? this.notes().reverse().map( note => 
            <NoteSingle key = {note._id} 
                        note = {note} 
                        player = {this.state.player} />
          ) : <div></div> }
        </ul>
      </div>
    )
  } 
}