import React, {Component} from 'react';

export default class SingleVideo extends Component {
  render () {
    console.log('single', this.props.video);
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
          <button className = "goButton"> Go! </button>
        </div>
      </li>
    )
  }
}