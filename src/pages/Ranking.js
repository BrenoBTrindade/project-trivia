import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const storeSorted = [...storage.sort((a, b) => b.score - a.score)];
    this.setState({ rankings: storeSorted });
  }

  render() {
    const { rankings } = this.state;

    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankings.map((e, index) => (
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

export default connect(mapStateToProps)(Ranking);
