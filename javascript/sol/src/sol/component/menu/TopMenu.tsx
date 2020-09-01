import {AppBar, IconButton, Menu, MenuItem, Toolbar} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {currentAlias} from 'sol/api/auth/account';
import {loginState, logout} from 'sol/api/auth/security';
import {LoginContext} from 'sol/component/login';
import {useServerError} from 'sol/component/message';
import {EMPTY} from 'sol/util';
import {useSwitch} from 'sol/util/hook';
import {ChildrenProps} from 'sol/util/props';

export function TopMenu(props: ChildrenProps): JSX.Element {
  const [alias, setAlias] = useState(EMPTY);
  const [accountOpen, switchAccountOpen] = useSwitch(false);
  const signOut = useSignOut(switchAccountOpen);
  const handler = useServerError();

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
        <div>
          <IconButton onClick={switchAccountOpen}>
            <AccountCircle />
          </IconButton>
          <Menu open={accountOpen}>
            <MenuItem onClick={switchAccountOpen}>
              <strong>{alias}</strong>
            </MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

function useSignOut(
  switchDialogOpen: () => void,
): () => void {
  const [, setLogin] = useContext(LoginContext);
  const handler = useServerError();

  return () => {
    logout()
      .then(loginState)
      .then(res => setLogin(res.exists))
      .catch(handler);
    switchDialogOpen();
  };
}
