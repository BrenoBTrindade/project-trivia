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
      shuffleAnswers: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({ questions: data.results, responseCode: data.response_code }, () => {
      this.setState({ loading: false });
    });
    this.tokenValidation();
    this.shuffleArray();
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
  const n = 0.5;
  answers.sort(() => Math.random() - n);
  this.setState({ shuffleAnswers: answers });
}

render() {
  const { questions, questionsIndex, loading, shuffleAnswers } = this.state;
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
          <div data-testid="answer-options">
            {
              shuffleAnswers.map((answer, index) => {
                const correctAnswer = questions[questionsIndex].correct_answer;
                console.log(correctAnswer);
                if (answer === correctAnswer) {
                  return (
                    <button
                      type="button"
                      data-testeid="correct-answer"
                      key={ index }
                    >
                      { answer }
                    </button>
                  );
                }
                if (index !== 0 && answer !== correctAnswer) {
                  return (
                    <button
                      type="button"
                      data-testid={ `wrong-answer-${index - 1}` }
                      key={ index }
                    >
                      { answer }
                    </button>
                  );
                }
                return null;
              })
            }
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
