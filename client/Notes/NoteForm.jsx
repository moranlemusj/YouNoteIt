import React, {Component} from 'react';
export default class NoteForm extends Component {

  render() {
    const notef = (this.props.player && this.props.id)
      ? (
        <form onSubmit={this.props.onSubmit} className="new-note">
          <h3 className="video__title">Add Note:</h3>
          <input
            onChange={this.props.typedStr}
            className="input"
            type="text"
            ref="note"
            value={this.props.text}
            placeholder="Jot it down, press Enter to record!"
          />
        </form>
      )
      : <div />

    return (
      <div>
        {notef}
      </div>
    )
  }
}
