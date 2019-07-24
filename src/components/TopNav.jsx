import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";
const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="light-2"
    pad={{ vertical: "6px", horizontal: "medium" }}
    elevation="medium"
    {...props}
  />
);
function ButtonAppBar(props) {
  const { children } = props;
  return (
    <AppBar>
      <div>
        <Heading level="3">CQA</Heading>
      </div>
      <div>{children}</div>
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ButtonAppBar;
