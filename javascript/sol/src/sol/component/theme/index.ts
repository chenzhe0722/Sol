import {createContext, useContext} from 'react';
import {doNothing} from 'sol/util';

export function useThemeType(): boolean {
  const [type] = useContext(ThemeTypeContext);
  return type;
}

export function useOutlinedColor(): OutlinedColor {
  return useThemeType() ? 'primary' : 'inherit';
}

type OutlinedColor =
  'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

export const ThemeTypeContext =
  createContext<[boolean, () => void]>([true, doNothing]);
