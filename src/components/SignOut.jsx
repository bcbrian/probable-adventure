import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';

export default class SignOut extends Component {
  handleClick = () => {
    this.props.onSignOut();
  };

  render() {
    return <Button label="Sign Out" onClick={this.handleClick} />;
  }
}

SignOut.propTypes = {
  onSignOut: PropTypes.func.isRequired
};
