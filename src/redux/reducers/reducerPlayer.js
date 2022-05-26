const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
      assertions: state.assertions + 1,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default player;
