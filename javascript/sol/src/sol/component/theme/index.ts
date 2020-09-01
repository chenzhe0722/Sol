import {PropTypes} from '@material-ui/core';
import {createContext, useContext} from 'react';
import {doNothing} from 'sol/util';

export function useThemeType(): boolean {
  const [type] = useContext(ThemeTypeContext);
  return type;
}

export function useOutlinedColor(): PropTypes.Color {
  return useThemeType() ? 'primary' : 'inherit';
}

export const ThemeTypeContext =
  createContext<[boolean, () => void]>([true, doNothing]);
