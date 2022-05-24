const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
}

export default player;
