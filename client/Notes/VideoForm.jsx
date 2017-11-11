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
    console.log('[banana] on load', event.target.getVideoData().video_id)
    try { 
      // console.log('load player',event.target.getVideoData());
      if (event.target.getVideoData().video_id) {
        console.warn('[banana] bim', event.target.getVideoData().video_id);
        event.target.seekTo(1, true);
        this.props.onSetPlayer(event.target);
      } else {
        console.log('[banana] bam');
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
    console.log('First', FlowRouter.current().path, FlowRouter.current().path !== '/videos');
    //BROKEN! USE REGEX TO MATCH SINGLE AND ONLY EXECUTE IF IT MATCHES! Broken when tries to go to home page, can fix with this matching sitch, maybe bracket?
    if (this.props.initialUrl && (FlowRouter.current().path.match('/single/'))) {
      console.log('this', this)
      console.log('this.state', this.state);
      console.log('this.props', this.props)
      let x = this.props.initialUrl;
      this.setState({
        url: x,
      })
      console.log('after setState', this);
      console.log(x)
      console.log('[banana] calling set video')
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