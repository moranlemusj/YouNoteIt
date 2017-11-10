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
    try { if(!Meteor.userId()) {
      throw new Meteor.Error('Sign in please!');
    } } catch(e) {
        Bert.alert('Sign in!', 'danger', 'fixed-top', 'fa-frown-o');
      }
    // let urlX = this.refs.vid.value.trim().replace(/\S*=/,'https://www.youtube.com/embed/');
    let urlX = this.refs.vid.value.trim().replace(/\S*?=/,'');
    urlX = urlX.replace(/&\S*/,'');
    this.props.setVideo(urlX);
    this.setState( { ...this.state, url: urlX });
  }
  onLoad(event) {
    try { 
      if (event.target.getVideoData().video_id) {
        this.props.getVideo(event.target);
        event.target.seekTo(1, true);
        this.setState({ ...this.state, player: event.target})
      } else {
        this.setState({...this.state, url: ''});
        throw new Meteor.Error('Invalid link');
      }
    } catch (e) {
      Bert.alert('Invalid link!', 'danger', 'fixed-top', 'fa-frown-o');
    }
  }
  componentDidMount() {
    let self = this;
    Tracker.autorun(function(){
        console.log(self.props)
        let x = self.props.initialUrl;
        self.setState({...self.state,
          url: x
        })
        console.log(self.state);
        self.props.setVideo(x);
        FlowRouter.watchPathChange();
    })
  }

  render() {
    const video = (this.state.url && Meteor.userId()) ?
          <YouTube ref="player" videoId={this.state.url} 
                   onReady={this.onLoad.bind(this)}></YouTube> : 
          <form className="new-note" onSubmit={this.addVideo.bind(this)} >
            <input type="text" ref="vid"
            placeholder="Enter a Video URL" />
          </form>

    return (
      <div>
        {video}
      </div>
    )
  }
}