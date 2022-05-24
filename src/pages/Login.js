import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchToken from '../services/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      nameInput: '',
      emailInput: '',
    };
  }

  handleClick = async () => {
    const { history } = this.props;
    fetchToken();
    const result = await fetchToken();
    console.log(result);
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
      <div>
        <h1>Login</h1>
        <section>
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
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
