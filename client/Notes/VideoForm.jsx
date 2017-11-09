import React, {Component} from 'react';
import YouTube from 'react-youtube';

export default class VideoForm extends Component {
  constructor() {
    super();
    
    this.state =  {
      url: '',
    }
  }
  addVideo(event) {
    event.preventDefault();
    if(!Meteor.userId()) {
      alert('sign in!');
      this.refs.vid.value = '';
      throw new Meteor.Error('Sign in please!');
    }
    // let urlX = this.refs.vid.value.trim().replace(/\S*=/,'https://www.youtube.com/embed/');
    let urlX = this.refs.vid.value.trim().replace(/\S*?=/,'');
    urlX = urlX.replace(/&\S*/,'');
    this.props.setVideo(urlX);
    this.setState( { ...this.state, url: urlX });
  }
    onLoad(event) {
      this.props.getVideo(event.target);
      event.target.seekTo(1, true);
        // console.log(event.target.getCurrentTime());
    }

  render() {
    const video = (this.state.url && Meteor.userId()) ?
          <YouTube ref="player" videoId={this.state.url} 
                   onReady={this.onLoad.bind(this)}></YouTube> : 
          <form className="new-note" onSubmit={this.addVideo.bind(this)} >
            <input type="text" ref="vid"
            placeholder="Enter a Video URL" />
          </form>
      {/* <iframe id="player-loaded" 
      width="420" height="315" 
      frameBorder="0" src={this.state.url} onLoad={this.playerLoaded}> </iframe>  */}
      
    return (
      <div>
        {video}
      </div>
    )
  }
}