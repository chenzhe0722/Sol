import {DarkMode, LightMode} from '@mui/icons-material';
import {IconButton, IconButtonProps} from '@mui/material';
import * as React from 'react';
import {useContext} from 'react';
import {ThemeTypeContext} from 'sol/component/theme';
import {ExcludeKey} from 'sol/util';

export function ThemeTypeButton(
  props: ExcludeKey<IconButtonProps, 'onClick'>,
): JSX.Element {
  const [type, switchType] = useContext(ThemeTypeContext);
  return (
    <IconButton onClick={switchType} {...props}>
      {type ? (<LightMode />) : (<DarkMode />)}
    </IconButton>
  );
}
