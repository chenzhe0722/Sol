import * as React from 'react';
import {ReactNode} from 'react';
import {LoginText} from 'sol/locale/component/session';

export const LOGIN_TEXT: LoginText = {
  name: 'Username',
  password: 'Password',
  signUp: 'Sign Up',
  signIn: 'Sign In',
  confirm: 'Confirm',
  cancel: 'Cancel',
  dialog: dialog,
  success: <>Sign up successfully.</>,
  invalid: <>Username or password <strong>CAN NOT</strong> be empty.</>,
  inconsistent:
    <>Password <strong>IS NOT</strong> consistent with the one before.</>,
  occupied: occupied,
};

function dialog(name: string): ReactNode {
  return (
    <>
      <p>
        You are signing up for username <strong>{name}</strong>.
      </p>
      <p>
        Please enter password again.
      </p>
    </>
  );
}

function occupied(name: string): ReactNode {
  return <>Username <strong>{name}</strong> has already been occupied.</>;
}
