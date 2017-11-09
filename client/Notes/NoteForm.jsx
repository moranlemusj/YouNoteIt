import React, {Component} from 'react';

export default class NoteForm extends Component {
  addNote(event) {
    event.preventDefault();
    // console.log(player.getCurrentTime():Number);
    let text = this.refs.note.value.trim();
    let time = this.props.player.getCurrentTime() || 0;
    let video = this.props.video;
    Meteor.call('addNote', text, time, video, () => {
      this.refs.note.value = '';
    });
  }

  render() {
    return (
      <div>
        <form className="new-note" onSubmit={this.addNote.bind(this)}>
          <input type="text" ref="note"
            placeholder="Jot it down, press Enter to record!" />
        </form>
      </div>
    )
  }
}