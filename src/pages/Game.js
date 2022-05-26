import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import { savePlayerEmail, savePlayerName } from '../redux/actions';
import AnswerButtons from '../components/AnswerButtons/AnswerButtons';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      responseCode: 0,
      questions: [],
      questionsIndex: 0,
      loading: true,
      shuffleAnswers: [],
      // showAnswers: false,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({ questions: data.results, responseCode: data.response_code }, () => {
      this.setState({ loading: false });
      this.tokenValidation();
    });

    this.shuffleArray();
  }

  tokenValidation = () => {
    const { responseCode } = this.state;
    const { history, dispatch } = this.props;
    const three = 3;
    if (responseCode === three) {
      localStorage.removeItem('token');
      history.push('/');
      dispatch(savePlayerEmail(''));
      dispatch(savePlayerName(''));
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

// showBorders = () => {
//   this.setState({ showAnswers: true });
// }

render() {
  const {
    questions,
    questionsIndex,
    loading,
    shuffleAnswers,
    // showAnswers,
  } = this.state;
  return (
    <div>
      <div>
        <Header />
      </div>
      <h1>Game</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <AnswerButtons
          questions={ questions }
          questionsIndex={ questionsIndex }
          shuffleAnswers={ shuffleAnswers }
          // showAnswers={ showAnswers }
          // showBorders={ this.showBorders }
        />
      )}
    </div>
  );
}
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Game);
