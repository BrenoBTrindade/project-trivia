import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from '../Timer';
import './AnswerButtons.css';
import { updateScore } from '../../redux/actions';

class AnswerButtons extends Component {
  showBorders = () => {
    const wrongButtons = document.getElementsByClassName('wrong');
    const rightButton = document.getElementsByClassName('right');
    rightButton[0].classList.toggle('green');
    for (let i = 0; i < wrongButtons.length; i += 1) {
      wrongButtons[i].classList.toggle('red');
    }
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

    if (target.id === 'rigth') {
      const calcScore = ten + (timer * difficultyScore[difficulty]) + score;
      console.log(calcScore);
      dispatch(updateScore(calcScore));
    } else {
      return null;
    }
  }

  handleClick = ({ target }) => {
    this.showBorders();
    this.rigthAnswer(target);
  }

  render() {
    const {
      questions,
      questionsIndex,
      shuffleAnswers,
      timer,
      timeOut,
    } = this.props;
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
                      className="right"
                      id="rigth"
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
                      className="wrong"
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
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(AnswerButtons);
