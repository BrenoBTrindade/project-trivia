const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(url);
  const result = await request.json();
  return result.token;
};

export default fetchToken;
