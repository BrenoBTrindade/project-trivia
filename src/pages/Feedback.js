import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { clearState } from '../redux/actions';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: JSON.parse(localStorage.getItem('ranking')) || [],
    };
  }

playAgain = () => {
  const { history, dispatch } = this.props;
  dispatch(clearState());
  history.push('/');
};

goToRanking = () => {
  const { history, name, score, gravatarEmail } = this.props;

  const ranking = {
    name,
    score,
    picture: `https://www.gravatar.com/avatar/${this.hashConverter(gravatarEmail)}`,
  };

  this.setState((prevState) => ({ storage: [...prevState.storage, ranking] }),
    () => {
      const { storage } = this.state;
      localStorage.setItem('ranking', JSON.stringify(storage));
      history.push('/ranking');
    });
}

hashConverter = (email) => {
  const hash = md5(email).toString();
  return hash;
};

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
      <input
        type="button"
        value="Play Again"
        data-testid="btn-play-again"
        onClick={ () => this.playAgain() }
      />
      <input
        type="button"
        value="Ranking"
        data-testid="btn-ranking"
        onClick={ () => this.goToRanking() }
      />
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
