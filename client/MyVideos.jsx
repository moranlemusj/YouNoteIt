import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Container, Row } from 'reactstrap';
import SingleVideo from './SingleVideo.jsx';

export default class MyVideos extends TrackerReact(Component) {
  constructor() {
    super();

    this.state =  {
      //"notes:" doesn't matter
      subscription: {
        videos: Meteor.subscribe("usersVideos", '')
      },
      currentVideo: '',
      player: false,
      time: 0,

    }
  }

  componentWillUnmount() {
    this.state.subscription.videos.stop();
  }

  uniqueVideos() {
    let nts = Notes.find().fetch();
    let videos = {};
    nts.forEach(note => {
      videos[note.title] ? (videos[note.title]['counter'] += 1) : (videos[note.title] = {counter: 1, id: note.video} );
    })
    let videosArray = [];
    for (video in videos) {
      videosArray.push({video: video, counter: videos[video]['counter'], vidId: videos[video]['id'] })
    }
    return videosArray;
  }

  checkTitle = (listedVideo) => {
    if (listedVideo.sort((a,b)=>a-b)[0])
      return <h2 className='page__title page__title--video'>Your latest video</h2>    
  }
  render() {
    let numVideos = this.props.limit;
    let listedVideo = []
    if (this.props.limit === 'all')
      numVideos = this.uniqueVideos().length

    for (let i = this.uniqueVideos().length - numVideos; i <= this.uniqueVideos().length; i++) {
      listedVideo[i] = this.uniqueVideos()[i]
    }


    return (
      <Container>
        {this.checkTitle(listedVideo)}
        <Row>

        {

            listedVideo.sort((a,b) => a-b).map(video => {
              if (!video) return null
              return (

                <SingleVideo
                key = {video.vidId}
                video = {video}
                player = {this.state.player} />
              )
            }
          )
        }
        </Row>
      </Container>
    )
  }
}
