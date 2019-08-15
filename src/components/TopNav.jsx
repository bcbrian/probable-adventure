import React from "react";
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

export default ButtonAppBar;
