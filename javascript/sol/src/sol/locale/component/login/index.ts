import {ReactNode} from 'react';

export type LoginText = {
  signUp: ReactNode,
  signIn: ReactNode,
  dialog: (name: string) => ReactNode,
  success: ReactNode,
  invalid: ReactNode,
  inconsistent: ReactNode,
  occupied: (name: string) => ReactNode,
};

export const LOGIN_TEXT: LoginText = {
  signUp: undefined,
  signIn: undefined,
  dialog: () => undefined,
  success: undefined,
  invalid: undefined,
  inconsistent: undefined,
  occupied: () => undefined,
};
