const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(url);
  const result = await request.json();
  return result.token;
};

export const fetchQuestions = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(url);
  const result = await request.json();
  return result;
};

export default fetchToken;
