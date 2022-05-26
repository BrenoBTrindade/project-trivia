export const savePlayerName = (playerName) => ({
  type: 'CHANGE_NAME',
  payload: playerName,
});

export const savePlayerEmail = (playerEmail) => ({
  type: 'CHANGE_EMAIL',
  payload: playerEmail,
});

export const updateScore = (score) => ({
  type: 'UPDATE_SCORE',
  payload: score,
});
