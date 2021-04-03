import {ReactNode} from 'react';

export type LoginText = {
  name: ReactNode,
  password: ReactNode,
  signUp: ReactNode,
  signIn: ReactNode,
  confirm: ReactNode,
  cancel: ReactNode,
  dialog: (name: string) => ReactNode,
  success: ReactNode,
  invalid: ReactNode,
  inconsistent: ReactNode,
  occupied: (name: string) => ReactNode,
};

export const LOGIN_TEXT: LoginText = {
  name: undefined,
  password: undefined,
  signUp: undefined,
  signIn: undefined,
  confirm: undefined,
  cancel: undefined,
  dialog: () => undefined,
  success: undefined,
  invalid: undefined,
  inconsistent: undefined,
  occupied: () => undefined,
};
