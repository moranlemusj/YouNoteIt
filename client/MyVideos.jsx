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
    console.log(nts);
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

  render() {
    return (
      <Container>
        <Row>
          {this.uniqueVideos().map(video =>
          <SingleVideo key = {video.vidId}
                       video = {video}
                       player = {this.state.player} />
          )}
        </Row>
      </Container>
    )
  }
}
