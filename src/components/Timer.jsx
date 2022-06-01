import React, { Component } from 'react';
import propTypes from 'prop-types';
import './AnswerButtons/AnswerButtons.css';

class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <h2
        data-testid="timer"
        className="timer"
      >
        { timer }

      </h2>
    );
  }
}

Timer.propTypes = {
  timer: propTypes.number.isRequired,
};

export default Timer;
