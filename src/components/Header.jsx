import React, { Component } from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  hashConverter = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return hash;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <header>
          <span data-testid="header-player-name">{ name }</span>
          <span>{ score }</span>
          <img
            src={ `https://www.gravatar.com/avatar/${this.hashConverter()}` }
            alt="Player avatar"
            data-testid="header-profile-picture"
          />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
