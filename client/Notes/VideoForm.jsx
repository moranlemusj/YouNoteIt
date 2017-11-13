import React, {Component} from 'react';
import YouTube from 'react-youtube';
import { log } from 'util';

export default class VideoForm extends Component {
  constructor() {
    super();
    this.state =  {
      url: '',
    }
  }

  addVideo = (event) => {
    event.preventDefault();
    try { if(!Meteor.userId()) {
      throw new Meteor.Error('Sign in please!');
    } } catch(e) {
        Bert.alert('Sign in!', 'danger', 'fixed-top', 'fa-frown-o');
      }
    // let urlX = this.refs.vid.value.trim().replace(/\S*=/,'https://www.youtube.com/embed/');
    let urlX = this.refs.vid.value.trim().replace(/\S*?=/,'');
    urlX = urlX.replace(/&\S*/,'');
    this.props.setVideo(urlX);
    this.setState({ 
      url: urlX 
    });
  }

  onLoad = (event) => {
    try { 
      // console.log('load player',event.target.getVideoData());
      if (event.target.getVideoData().video_id) {
        event.target.seekTo(1, true);
        this.props.onSetPlayer(event.target);
      } else {
        this.setState({
          url: ''
        });
        throw new Meteor.Error('Invalid link');
      }
    } catch (e) {
      Bert.alert('Invalid link!', 'danger', 'fixed-top', 'fa-frown-o');
    }
  }

  componentDidMount() {
    Tracker.autorun(() => {
      if (this.props.initialUrl && (FlowRouter.current().path.match('/single/'))) {
        let x = this.props.initialUrl;
        this.setState({
          url: x,
        })
        this.props.setVideo(x);
      }
    FlowRouter.watchPathChange();
    })
  }

  render() {
    const video = (this.state.url && Meteor.userId()) ?
          <YouTube ref="player" videoId={this.state.url} 
                   onReady={this.onLoad}></YouTube> : 
          <form className="new-note" onSubmit={this.addVideo} >
            <input type="text" ref="vid"
            placeholder="https://www.youtube.com/..." />
          </form>

    return (
      <div>
        {video}
      </div>
    )
  }
}