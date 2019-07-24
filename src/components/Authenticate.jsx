import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import { Box, Button, DropButton } from 'grommet';

export default class Authenticate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignUp: false,
      isSignIn: false
    };
  }

  handleClickSignUp = () => {
    this.setState(({ isSignUp }) => ({ isSignUp: !isSignUp }));
  };

  handleClickSignIn = () => {
    this.setState(({ isSignIn }) => ({ isSignIn: !isSignIn }));
  };

  render() {
    const { user, onSignOut, onSignIn, onSignUp } = this.props;
    const { isSignUp, isSignIn } = this.state;
    return user ? (
      <>
        <Box>
          <SignOut onSignOut={onSignOut} />
        </Box>
      </>
    ) : (
      <>
        <Box justify="end" direction="row">
          <Box margin={{ right: 'small' }}>
            <DropButton
              label="Sign Up"
              onOpen={this.handleClickSignUp}
              onClose={this.handleClickSignUp}
              open={isSignUp}
              dropAlign={{ top: 'bottom', right: 'right' }}
              dropContent={
                <SignUp
                  onSignUp={onSignUp}
                  open={isSignUp}
                  toggle={this.handleClickSignUp}
                />
              }
            />
          </Box>
          <Box>
            <DropButton
              label="Sign In"
              onOpen={this.handleClickSignIn}
              onClose={this.handleClickSignIn}
              open={isSignIn}
              dropAlign={{ top: 'bottom', right: 'right' }}
              dropContent={
                <SignIn
                  onSignIn={onSignIn}
                  open={isSignIn}
                  toggle={this.handleClickSignIn}
                />
              }
            />
          </Box>
        </Box>
      </>
    );
  }
}

Authenticate.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  }),
  onSignOut: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired
};

Authenticate.defaultProps = {
  user: null
};
