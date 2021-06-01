import {createContext, useContext} from 'react';
import {CsrfView, CurrentView} from 'sol/api/auth/session';
import {doNothing} from 'sol/util';

export function useCsrf(): CsrfView | undefined {
  const [csrf] = useContext(CsrfContext);
  return csrf;
}

export function ussHandleCsrf(): () => void {
  const [, handler] = useContext(CsrfContext);
  return handler;
}

export const CsrfContext =
  createContext<[CsrfView | undefined, () => void]>([undefined, doNothing]);


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
