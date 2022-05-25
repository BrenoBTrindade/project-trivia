import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      responseCode: 0,
      questions: [],
      questionsIndex: 1,
      loading: true,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({ questions: data.results, responseCode: data.response_code }, () => {
      this.setState({ loading: false });
    });
    this.tokenValidation();
  }

  tokenValidation = () => {
    const { responseCode } = this.state;
    const { history } = this.props;
    const three = 3;
    if (responseCode === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

shuffleArray = () => {
  const { questions, questionsIndex } = this.state;
  const answers = [questions[questionsIndex].correct_answer,
    ...questions[questionsIndex].incorrect_answers];
  console.log(answers);
}

render() {
  const { questions, questionsIndex, loading } = this.state;
  return (
    <div>
      <h1>Game</h1>
      <Header />
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <div>
          <p
            data-testid="question-category"
          >
            { questions[questionsIndex].category }
          </p>
          <p
            data-testid="question-text"
          >
            { questions[questionsIndex].question }
          </p>
          <div>
            { this.shuffleArray() }
          </div>
        </div>
      )}
    </div>
  );
}
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Game;
