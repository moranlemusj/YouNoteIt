import React from 'react';
import ReactDOM from 'react-dom';
// substitute resolution with note
Notes = new Mongo.Collection('notes');

export default class App extends React.Component {

  addNote(event) {
    event.preventDefault();
    let text = this.refs.note.value.trim();
    
    Notes.insert({
      text: text,
      complete: false,
      createdAt: new Date(),
      seconds: 0,
      user: 'ZeroBrane',
      video: 'LvlUp Tutorial',
    });
    this.refs.note.value = '';
  }

  render() {
    return (
      <div>
        <h1>PadTube</h1>
        {/* called new-resolution on video */}
        <form className="new-note" onSubmit={this.addNote.bind(this)}>
          <input type="text" ref="note" 
            placeholder="Jot it down! Press Enter to Submit" />
        </form>
      </div>
    )
  } 
}
