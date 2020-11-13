import {AppBar, IconButton, Menu, MenuItem, Toolbar} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {currentAlias} from 'sol/api/auth/account';
import {logout} from 'sol/api/auth/security';
import {useLocale} from "sol/component/locale";
import {LocaleButton} from "sol/component/locale/LocaleButton";
import {useHandleLogin} from 'sol/component/login';
import {useServerError} from 'sol/component/message';
import {TOP_MENU_TEXT} from "sol/locale/component/menu";
import {EMPTY, ErrorHandler} from 'sol/util';
import {useSwitch} from 'sol/util/hook';
import {ChildrenProps} from 'sol/util/props';

export function TopMenu(props: ChildrenProps): JSX.Element {
  const [alias, setAlias] = useState(EMPTY);
  const [accountOpen, switchAccountOpen] = useSwitch(false);
  const handler = useServerError();
  const handleSignOut = signOut(useHandleLogin(), handler);

  const locale = useLocale();
  const [text, setText] = useState(TOP_MENU_TEXT);
  useEffect(
    () => {
      switch (locale) {
        case 'en':
          import('sol/locale/component/menu/en')
            .then(mdl => setText(mdl.TOP_MENU_TEXT))
            .catch(handler);
          break;
        case 'cmn-Hans':
          import('sol/locale/component/menu/cmn-Hans')
            .then(mdl => setText(mdl.TOP_MENU_TEXT))
            .catch(handler);
          break;
      }
    },
    [locale, handler]
  );

  useEffect(
    () => {
      currentAlias()
        .then(res => setAlias(res.alias))
        .catch(handler);
    },
    [handler],
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {props.children}
        <LocaleButton />
        <div>
          <IconButton onClick={switchAccountOpen}>
            <AccountCircle />
          </IconButton>
          <Menu open={accountOpen}>
            <MenuItem onClick={switchAccountOpen}>
              <strong>{alias}</strong>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>{text.account.signOut}</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

function signOut(
  handleLogin: () => void,
  handler: ErrorHandler,
): () => void {
  return () => {
    logout()
      .then(handleLogin)
      .catch(handler);
  };
}
