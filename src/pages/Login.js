import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchToken from '../services/api';
import logo from '../trivia.png';
import { savePlayerName, savePlayerEmail, clearState } from '../redux/actions';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      nameInput: '',
      emailInput: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clearState());
  }

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { nameInput, emailInput } = this.state;

    dispatch(savePlayerEmail(emailInput));
    dispatch(savePlayerName(nameInput));

    const result = await fetchToken();
    localStorage.setItem('token', result);
    history.push('/game');
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    }, () => {
      this.verifyButton();
    });
  }

  verifyButton = () => {
    const { nameInput, emailInput } = this.state;
    if (nameInput.length > 0 && emailInput.length > 0) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <main className="login-main">
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="login">
          <h1>Login</h1>
          <section className="form-login">
            <label htmlFor="nameInput">
              Player name:
              <input
                type="text"
                id="nameInput"
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="emailInput">
              E-mail:
              <input
                type="email"
                id="emailInput"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ disabled }
              data-testid="btn-play"
            >
              Play
            </button>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings">Settings</button>
            </Link>
          </section>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Login);
