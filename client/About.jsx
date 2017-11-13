import React, {Component} from 'react';

export default class About extends Component {
  render() {
    return (
      <div>
        <h1>About YouNoteIt</h1>
        <p> 
          PadTube is an application designed with the goal of enhancig YouTube tutorials. It allows you to take notes while watching
          a tutorial, and then, let's you go back to the exact moment in the video when you took the note, without any hazzle!
        </p>
        <p>
          Create an account, copy a video link and enjoy!
        </p>
        <h3> Info</h3>
            <ul>
              <li>
                <p>For convenience, new notes are displayed at the top of the list, but notes are sorted when the video is revisited!</p>
              </li>
            </ul>
      </div>
    )
  }
}