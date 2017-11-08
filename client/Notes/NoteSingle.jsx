import React, {Component} from 'react';

export default class NoteSingle extends Component {
  render () {
    return (
      <li> 
        note: {this.props.note.text} <br />
        time: {this.props.note.seconds} seconds 
      </li>
    )
  }
}