import React, { Component } from 'react';
import propTypes from 'prop-types';
import './AnswerButtons.css';

class AnswerButtons extends Component {
  showBorders = () => {
    const wrongButtons = document.getElementsByClassName('wrong');
    const rightButton = document.getElementsByClassName('right');
    rightButton[0].classList.toggle('green');
    for (let i = 0; i < wrongButtons.length; i += 1) {
      wrongButtons[i].classList.toggle('red');
    }
  }

  render() {
    const {
      questions,
      questionsIndex,
      shuffleAnswers,
    } = this.props;
    return (
      <div className="questions">
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
                    type="button"
                    data-testid="correct-answer"
                    key={ index }
                    onClick={ this.showBorders }
                  >
                    { answer }
                  </button>
                );
              }
              if (answer !== correctAnswer) {
                return (
                  <button
                    className="wrong"
                    type="button"
                    data-testid={ `wrong-answer-${index - 1}` }
                    key={ index }
                    onClick={ this.showBorders }
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
    );
  }
}

AnswerButtons.propTypes = {
  questions: propTypes.instanceOf(Array).isRequired,
  questionsIndex: propTypes.number.isRequired,
  shuffleAnswers: propTypes.instanceOf(Array).isRequired,
  // showAnswers: propTypes.bool.isRequired,
  // showBorders: propTypes.func.isRequired,
};

export default AnswerButtons;
