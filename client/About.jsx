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
        <h3> Custom Commands</h3>
        <ul>
          <li> 
            <p>' Command + / ' => stop video!</p>
            <p>This will work as long as the youtube player is not select. If it is, use spacebar to pause the video just like in YouTube. </p>
          </li>
        </ul>
      </div>
    )
  }
}