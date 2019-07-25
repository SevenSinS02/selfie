// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.cameraButton}>
          <Link to={routes.COUNTER}>
            <i
              className="fa fa-camera"
              aria-hidden="true"
              style={{ fontSize: '3rem' }}
            />
          </Link>
          <p>Touch the icon</p>
          <p>to take a picture</p>
        </div>
      </div>
    );
  }
}
