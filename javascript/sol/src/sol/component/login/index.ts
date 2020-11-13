import {createContext, useContext} from 'react';
import {doNothing} from 'sol/util';

export function useLogin(): boolean | undefined {
  const [login] = useContext(LoginContext);
  return login;
}

export function useHandleLogin(): () => void {
  const [, handler] = useContext(LoginContext);
  return handler;
}

export const LoginContext =
  createContext<[boolean | undefined, () => void]>([undefined, doNothing]);
