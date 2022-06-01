import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import { savePlayerEmail, savePlayerName } from '../redux/actions';
import AnswerButtons from '../components/AnswerButtons/AnswerButtons';
import '../components/AnswerButtons/AnswerButtons.css';

let interval;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      responseCode: 0,
      questions: [],
      questionsIndex: 0,
      loading: true,
      shuffleAnswers: [],
      timer: 30,
      timeOut: false,
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
    this.interval();
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

  updateTimer = () => {
    const { timer } = this.state;
    this.setState((prevState) => ({ timer: prevState.timer - 1 }), () => {
      if (timer === 1) {
        clearInterval(interval);
        this.setState({ timeOut: true });
      }
    });
  }

  interval = () => {
    const oneSec = 1000;
    interval = setInterval(this.updateTimer, oneSec);
  }

  nextQuestion = () => {
    const { questionsIndex } = this.state;
    const { history } = this.props;
    const four = 4;
    if (questionsIndex === four) {
      history.push('/feedback');
    }
    this.setState({
      questionsIndex: questionsIndex + 1,
      timer: 30,
    });
  }

  render() {
    const {
      questions,
      questionsIndex,
      loading,
      shuffleAnswers,
      timer,
      timeOut,
      answered,
    } = this.state;
    return (
      <div>
        <div>
          <Header />
        </div>
        <h1 className="game">Game</h1>
        {loading && <h2>Loading...</h2>}
        {!loading && (
          <div>
            <AnswerButtons
              timeOut={ timeOut }
              questions={ questions }
              questionsIndex={ questionsIndex }
              shuffleAnswers={ shuffleAnswers }
              timer={ timer }
              answered={ answered }
              nextQuestion={ this.nextQuestion }
              shuffleArray={ this.shuffleArray }
            />
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
  dispatch: propTypes.func.isRequired,
};

export default connect()(Game);
