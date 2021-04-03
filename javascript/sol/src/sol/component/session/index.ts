import {createContext, useContext} from 'react';
import {CurrentView} from 'sol/api/auth/session';
import {doNothing} from 'sol/util';

export function useCurrent(): CurrentView | undefined {
  const [curr] = useContext(CurrentContext);
  return curr;
}

export function useHandleCurrent(): () => void {
  const [, handler] = useContext(CurrentContext);
  return handler;
}

export const CurrentContext =
  createContext<[CurrentView | undefined, () => void]>([undefined, doNothing]);
