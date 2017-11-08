import React from 'react';
import ReactDOM from 'react-dom';
//allows for data handling
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import NoteForm from './NoteForm.jsx';
import NoteSingle from './NoteSingle.jsx';
// substitute resolution with note
Notes = new Mongo.Collection('notes');


export default class NotesContainer extends TrackerReact(React.Component) {
  constructor() {
    super();
    
    this.state =  {
      //"notes:" doesn't matter
      subscription: {
        sack: Meteor.subscribe("allNotes")
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.notes.stop();
  }

  notes() {
    //fetch gives object, find a cursor;
    return Notes.find().fetch();
  }

  render() {
    return (
      <div>
        <h1>PadTube</h1>
        <h2>VIDEO WILL GO HERE</h2>
        <NoteForm />
        <h3> Notes for Video </h3>
        <ul className = "notes">
          {this.notes().reverse().map( note => 
            <NoteSingle key = {note._id} note = {note} />
          )}
        </ul>
      </div>
    )
  } 
}
