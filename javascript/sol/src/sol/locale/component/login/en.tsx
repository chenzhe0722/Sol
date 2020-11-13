import * as React from "react";
import {ReactNode} from "react";
import {LoginText} from 'sol/locale/component/login';

export const LOGIN_TEXT: LoginText = {
  signUp: 'Sign Up',
  signIn: 'Sign In',
  dialog: dialog,
  success: <>Sign up successfully.</>,
  invalid: <>Name or password <strong>CAN NOT</strong> be empty.</>,
  inconsistent: <>Password <strong>IS NOT</strong> consistent with the one before.</>,
  occupied: occupied,
};

function dialog(name: string): ReactNode {
  return (
    <>
      <p>
        You are signing up for account <strong>{name}</strong>.
        Account name <strong>CAN NOT</strong> be modified after signing
        up, but alias can.
      </p>
      <p>
        Please enter password again.
      </p>
    </>
  );
}

function occupied(name: string): ReactNode {
  return <>Name <strong>{name}</strong> has already been occupied.</>;
}
