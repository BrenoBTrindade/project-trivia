import React from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  hashConverter = (email) => {
    const hash = md5(email).toString();
    return hash;
  };

  render() {
    const { name, score, gravatarEmail } = this.props;

    const ranking = [{
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${this.hashConverter(gravatarEmail)}`,
    }];

    localStorage.setItem('ranking', JSON.stringify(ranking));

    const rankingElements = JSON.parse(localStorage.getItem('ranking'));

    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingElements.map((e, index) => (
          <div key={ index }>
            <img src={ e.picture } alt="Player avatar" />
            <span data-testid={ `player-name-${index}` }>{ e.name }</span>
            <span data-testid={ `player-score-${index}` }>{ e.score }</span>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Login</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Ranking.propTypes = {
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  gravatarEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
