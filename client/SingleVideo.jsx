import React, {Component} from 'react';
import { Col, Button } from 'reactstrap';
import './styles/my-video.css'

export default class SingleVideo extends Component {
  sendToSingle = () => {
    FlowRouter.redirect(`/single/${this.props.video.vidId}`);
  }
  render () {
    const url = `http://img.youtube.com/vi/${this.props.video.vidId}/hqdefault.jpg`
    return (
      <Col className="my-video__column" md="4">
        <div className="my-video" onClick={this.sendToSingle}>
          <div className="my-video__header">
            <img className="my-video__img" src= {url} />
            <h3 className="my-video__title">
              {this.props.video.video}
            </h3>
          </div>
          <div className = "my-video__description">
            <div className = "my-video__label">Notes:</div>
            <div className = "my-video__counter">{this.props.video.counter}</div>
          </div>
        </div>
      </Col>
    )
  }
}
