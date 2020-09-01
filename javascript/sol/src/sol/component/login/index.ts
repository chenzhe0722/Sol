import {createContext} from 'react';
import {doNothing} from 'sol/util';

export const LoginContext =
  createContext<[boolean | undefined, (login: boolean) => void]>(
    [undefined, doNothing],
  );
