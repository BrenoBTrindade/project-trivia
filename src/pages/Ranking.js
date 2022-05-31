import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Ranking.css';

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
      <main className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankings.map((e, index) => (
          <div className="ranking-form" key={ index }>
            <img src={ e.picture } alt="Player avatar" />
            <p data-testid={ `player-name-${index}` }>{ e.name }</p>
            <p data-testid={ `player-score-${index}` }>{ e.score }</p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Login</button>
        </Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Ranking);
