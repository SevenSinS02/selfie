import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import { CSSTransition } from 'react-transition-group';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';
import styles from './ImageCapture.css';

const videoJsOptions = {
  controls: false,
  width: 530,
  height: 400,
  fluid: false,
  plugins: {
    record: {
      image: true,
      debug: true
    }
  }
};

// Optional imports for videojs-record plugins

class ImageCapture extends Component {
  state = { clicked: false, show: false, file: '' };

  componentDidMount() {
    // instantiate Video.js
    const { onCapture } = this.props;
    this.player = videojs(this.videoNode, videoJsOptions, () => {
      // print version information at startup
      videojs.log('player');
    });

    this.player.record().getDevice();

    // device is ready
    this.player.on('deviceReady', () => {
      setTimeout(() => {
        //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        this.player.recordToggle.trigger('click');
        this.setState({ clicked: true });
      }, 3000);

      console.log('device is ready!');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      const file = this.player.recordedData;
      this.setState({ file });
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  showPicture = () => {
    console.log('hello');
    this.setState({ show: true, clicked: null });
  };

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    const { clicked, file, show } = this.state;
    return (
      <div
        className={styles.container}
        style={{ background: clicked ? '#fff' : '#000' }}
      >
        {clicked === false ? (
          <div data-vjs-player className={styles.camera}>
            <video
              id="myVideo"
              ref={node => (this.videoNode = node)}
              className="video-js vjs-default-skin"
              playsInline
            />
          </div>
        ) : null}

        <CSSTransition
          in={clicked}
          timeout={1000}
          classNames="alert"
          onEntered={() => this.showPicture()}
          unmountOnExit
        >
          <div className={styles.cameraContainer}>
            <i className={`fa fa-camera ${styles.camera}`} aria-hidden="true" />
          </div>
        </CSSTransition>

        <CSSTransition in={show} timeout={1000} classNames="fade" unmountOnExit>
          <div className={styles.image}>
            <img src={file} />
            <div>
              <Link to="/">
                <button type="button">Back</button>
              </Link>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
export default ImageCapture;
