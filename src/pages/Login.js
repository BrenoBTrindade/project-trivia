import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      nameInput: '',
      emailInput: '',
    };
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
            disabled={ disabled }
            data-testid="btn-play"
          >
            Play
          </button>
        </section>
      </div>
    );
  }
}

export default Login;
