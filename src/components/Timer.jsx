import React, { Component } from 'react';
import propTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <span>{ timer }</span>
    );
  }
}

Timer.propTypes = {
  timer: propTypes.number.isRequired,
};

export default Timer;