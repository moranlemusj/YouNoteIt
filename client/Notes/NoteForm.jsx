import React, {Component} from 'react';

export default class NoteForm extends Component {
  addNote(event) {
    event.preventDefault();
    let vidId = this.props.player.getVideoData().video_id;
    console.log(vidId);
    let title = this.props.player.getVideoData().title;
    let text = this.refs.note.value.trim();
    let secs = Math.round(this.props.player.getCurrentTime() - 20)
    let time = (secs > 0) ? secs : 0;
    let video = this.props.video;
    Meteor.call('addNote', text, time, video, title, vidId, (error, data) => {
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
                      <input type="text" ref="note"
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