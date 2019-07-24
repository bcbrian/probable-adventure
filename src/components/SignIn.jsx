import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextInput, Heading } from 'grommet';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailOnChange = ({ target }) => {
    this.setState(() => ({
      email: target.value
    }));
  };

  handlePasswordOnChange = ({ target }) => {
    this.setState(() => ({
      password: target.value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onSignIn({ email, password });
  };

  render() {
    const { open, toggle } = this.props;
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Box pad="medium" height="medium" justify="between">
          <Heading level="4">
            Lets get you signed in so you can know whats left.
          </Heading>
          <TextInput
            onChange={this.handleEmailOnChange}
            value={email}
            type="text"
            name="email"
            placeholder="Email"
          />
          <TextInput
            onChange={this.handlePasswordOnChange}
            value={password}
            type="password"
            name="pasword"
            placeholder="Password"
          />
          <Box justify="around" direction="row">
            <Button label="Cancel" onClick={toggle} />
            <Button label="Sign In" type="submit" primary />
          </Box>
        </Box>
      </form>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired
};
