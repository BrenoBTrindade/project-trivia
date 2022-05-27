import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;

    const feedbackMessage = () => {
      const THREE = 3;
      if (assertions < THREE) {
        return 'Could be better...';
      }
      return 'Well Done!';
    };

    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <p data-testid="feedback-text">{ feedbackMessage() }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
