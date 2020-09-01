import {IconButton, IconButtonProps} from '@material-ui/core';
import {Brightness4, Brightness7} from '@material-ui/icons';
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
      {type ? (<Brightness7 />) : (<Brightness4 />)}
    </IconButton>
  );
}
