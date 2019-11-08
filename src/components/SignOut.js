import React from "react";
import { signOut } from "../firebase/auth";

import Button from "./Button";

const SignOut = () => (
  <>
    <Button onClick={() => signOut()}>sign out</Button>
  </>
);

export default SignOut;
