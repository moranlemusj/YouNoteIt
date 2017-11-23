import React, {Component} from 'react';
import Moment from 'react-moment';
import { Col, Row, Button } from 'reactstrap';

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
    const marker = (this.props.note.text) ?
    <p className="note__text">{this.props.note.text}</p>
    :
    <p className="note__marker"> ----- Marker ----- </p>

    const notes = (this.props.note.update)
    ?
    <div>
      <form className="new-note" onSubmit={this.updateText.bind(this)}>
        <h5>Update note:</h5>
        <input className="input" type="text" ref="note"
              defaultValue={this.props.note.text} />
      </form>
    </div>
    :
    <div className="note">
        <div className="note__description" onClick={this.sendToVideo.bind(this)}>
          {marker}
        </div>
        <div className = "note__time">
          <span>time:</span> <Moment format="mm:ss">{this.props.note.seconds * 1000}</Moment>
        </div>
        <div className="note__action">
          <button className = "button button--note button--update" onClick={this.updateNote.bind(this)}> Update </button>
          <button className = "button button--note button--delete" onClick={this.deleteNote.bind(this)}> Delete </button>
        </div>
      </div>
    return (
      <Col className="note__column" md="4">
        {notes}
      </Col>
    )
  }
}
