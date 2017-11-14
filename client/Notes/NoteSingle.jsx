import React, {Component} from 'react';

export default class NoteSingle extends Component {
  constructor() {
    super();
    this.state = {
      update : false,
    }
  }
  sendToVideo() {
    this.props.player.seekTo(this.props.note.seconds, true);
  }

  deleteNote() {
    Meteor.call('deleteNote', this.props.note);
  }

  updateNote() {
    this.setState({update: true})
    this.props.note.update = !this.props.note.update;
  }
  
  updateText() {
    this.updateNote();
    Meteor.call('updateText', this.props.note._id, this.refs.note.value.trim());
    this.setState({update: false});
  }
  render () {
    const marker = (this.props.note.text) ? <div><span className= "boldThis"> Note: </span> {this.props.note.text}</div> :
      <span className = "boldThis"> ----- Marker ----- </span>
    const notes = (this.props.note.update) ?
    <li>         
      <form className="new-note" onSubmit={this.updateText.bind(this)}>
        <input type="text" ref="note"
              defaultValue={this.props.note.text} />
      </form>
    </li> :
    <li>
        <div className="note">
          <div className="singleNote">
              {marker}
          </div>
            <button className = "btn-cancel cancel" onClick={this.deleteNote.bind(this)}> &times; </button>
        </div>
        <div className = "time">
          time: {this.props.note.seconds} seconds
          <button className = "goButton" onClick={this.sendToVideo.bind(this)}> Go! </button>
          <button className = "goButton" onClick={this.updateNote.bind(this)}> Update! </button>

        </div>
      </li>
    return (
      <div>
        {notes}
      </div>
    )
  }
}