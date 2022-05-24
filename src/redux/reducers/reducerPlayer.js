const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TEST':
    return {
      ...state,
    };
  default:
    return state;
  }
}
