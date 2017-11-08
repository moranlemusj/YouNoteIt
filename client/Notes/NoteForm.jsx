import React, {Component} from 'react';

export default class NoteForm extends Component {
  addNote(event) {
    event.preventDefault();
    let text = this.refs.note.value.trim();
    let time = 10;
    Meteor.call('addNote', text, time, () => {
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