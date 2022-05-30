import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from '../Timer';
import './AnswerButtons.css';
import { updateScore, getCorrectAnswersQuantity } from '../../redux/actions';

class AnswerButtons extends Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      right: 'right',
      wrong: 'wrong',
    };
  }

  showBorders = () => {
    this.setState({
      right: 'green',
      wrong: 'red',
    });
  }

  rigthAnswer = (target) => {
    const { timer, score, questions, questionsIndex, dispatch } = this.props;
    const { difficulty } = questions[questionsIndex];
    const ten = 10;

    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (target.id === 'right') {
      const calcScore = ten + (timer * difficultyScore[difficulty]) + score;
      dispatch(updateScore(calcScore));
      dispatch(getCorrectAnswersQuantity());
    } else {
      return null;
    }
  }

  handleClick = ({ target }) => {
    this.setState({
      answered: true,
    });
    this.showBorders();
    this.rigthAnswer(target);
  }

  handleNext = () => {
    const { nextQuestion, shuffleArray } = this.props;
    this.setState({
      right: 'right',
      wrong: 'wrong',
      answered: false,
    }, async () => {
      await nextQuestion();
      await shuffleArray();
    });
  }

  render() {
    const {
      questions,
      questionsIndex,
      shuffleAnswers,
      timer,
      timeOut,
    } = this.props;
    const {
      answered,
      right,
      wrong,
    } = this.state;
    return (
      <div>
        <div className="questions">
          <div>
            <Timer timer={ timer } />
          </div>
          <h2
            data-testid="question-category"
          >
            { questions[questionsIndex].category }
          </h2>
          <h3
            data-testid="question-text"
          >
            { questions[questionsIndex].question }
          </h3>
          <div data-testid="answer-options">
            {
              shuffleAnswers.map((answer, index) => {
                const correctAnswer = questions[questionsIndex].correct_answer;
                if (answer === correctAnswer) {
                  return (
                    <button
                      className={ right }
                      id="right"
                      type="button"
                      data-testid="correct-answer"
                      key={ index }
                      onClick={ this.handleClick }
                      disabled={ timeOut }
                    >
                      { answer }
                    </button>
                  );
                }
                if (answer !== correctAnswer) {
                  return (
                    <button
                      className={ wrong }
                      id="wrong"
                      type="button"
                      data-testid={ `wrong-answer-${index - 1}` }
                      key={ index }
                      onClick={ this.handleClick }
                      disabled={ timeOut }
                    >
                      { answer }
                    </button>
                  );
                }
                return null;
              })
            }
            {answered && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNext }
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

AnswerButtons.propTypes = {
  questions: propTypes.instanceOf(Array).isRequired,
  questionsIndex: propTypes.number.isRequired,
  shuffleAnswers: propTypes.instanceOf(Array).isRequired,
  timer: propTypes.number.isRequired,
  timeOut: propTypes.bool.isRequired,
  score: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
  nextQuestion: propTypes.func.isRequired,
  shuffleArray: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(AnswerButtons);
