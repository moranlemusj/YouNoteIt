import React, {Component} from 'react';
export default class NoteForm extends Component {

  render() {
    const notef = (this.props.player && this.props.id)
      ? (
        <div className="new-note">
          <input onKeyUp={this.props.typedStr} type="text" ref="note"
                placeholder="Jot it down, press Enter to record!"
                value={this.props.text}/>
        </div>
      )
      : <div />

    return (
      <div>
        {notef}
      </div>
    )
  }
}
