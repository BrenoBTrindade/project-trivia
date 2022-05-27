const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  correctAnswers: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_NAME':
    return {
      ...state,
      name: action.payload,
    };
  case 'CHANGE_EMAIL':
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case 'UPDATE_SCORE':
    return {
      ...state,
      score: action.payload,
    };
  case 'CORRECT_ANSWERS_QUANTITY':
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
