import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import * as React from 'react';
import {ThemeTypeContext} from 'sol/component/theme';
import {useSwitch} from 'sol/util/hook';
import {ChildrenProps} from 'sol/util/props';

export function ThemeTypeProvider(props: ChildrenProps): JSX.Element {
  const [type, switchType] = useSwitch(true);
  return (
    <ThemeTypeContext.Provider value={[type, switchType]}>
      <ThemeProvider theme={type ? lightTheme : darkTheme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeTypeContext.Provider>
  );
}

const lightTheme = createMuiTheme();
const darkTheme = createMuiTheme({palette: {type: 'dark'}});
