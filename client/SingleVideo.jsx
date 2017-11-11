import React, {Component} from 'react';

export default class SingleVideo extends Component {
  sendToSingle() {
    // console.log('[banana]', this.props)
    FlowRouter.redirect(`/single/${this.props.video.vidId}`);
  }
  render () {
    const url = `http://img.youtube.com/vi/${this.props.video.vidId}/1.jpg`
    return (
      <li>
        <div className="note">
          <div className="singleNote">
              <span className= "boldThis">Title: </span> {this.props.video.video}
          </div>
            <img src= {url} />
        </div>
        <div className = "time">
          Notes: {this.props.video.counter}
          <button className = "goButton" onClick={this.sendToSingle.bind(this)}> Go! </button>
        </div>
      </li>
    )
  }
}