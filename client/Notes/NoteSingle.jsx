import React, {Component} from 'react';

export default class NoteSingle extends Component {
  sendToVideo() {
    console.log("Send to Time in Video", this.props.note.seconds);
  }

  deleteNote() {
    Meteor.call('deleteNote', this.props.note._id);
  }
  render () {
    return (
      <li>
        <div className="note">
          <div className="singleNote">
              <span className= "boldThis">Note: </span> {this.props.note.text}
          </div>
            <button className = "btn-cancel cancel" onClick={this.deleteNote.bind(this)}> &times; </button>
        </div>
        <div className = "time">
          time: {this.props.note.seconds} seconds
          <button className = "goButton" onClick={this.sendToVideo.bind(this)}> Go! </button>
        </div>
      </li>
    )
  }
}