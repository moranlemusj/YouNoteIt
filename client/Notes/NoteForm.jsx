import React, {Component} from 'react';
export default class NoteForm extends Component {
  addNote(event) {
    event.preventDefault();
    console.log(this.props.id)
    let vidId = this.props.id;
    let title = this.props.title;
    let text = this.refs.note.value.trim();
    let secs = Math.round(this.props.player.getCurrentTime() - (this.props.gap / 1000));
    let time = (secs > 0) ? secs : 0;
    let video = this.props.video;
    let update = false;
    console.log("TIME", time)
    Meteor.call('addNote', text, time, video, title, vidId, update, (error, data) => {
      if (error) {
        Bert.alert('Invalid link!', 'danger', 'fixed-top', 'fa-frown-o');
      } else {
      this.refs.note.value = '';
      }
    });
  }

  render() {
    const notef = (this.props.player && this.props.id) ?
                      <form className="new-note" onSubmit={this.addNote.bind(this)}>
                        <input onKeyUp={(e) => this.props.typedStr(e)} type="text" ref="note"
                              placeholder="Jot it down, press Enter to record!" />
                      </form> :
                    <div></div>
    return (
      <div>
        {notef}
      </div>
    )
  }
}
