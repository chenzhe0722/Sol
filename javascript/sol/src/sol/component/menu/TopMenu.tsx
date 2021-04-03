import {AppBar, IconButton, Menu, MenuItem, Toolbar} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import * as React from 'react';
import {MouseEvent, useEffect, useState} from 'react';
import {logout} from 'sol/api/auth/security';
import {useLocale} from 'sol/component/locale';
import {LocaleButton} from 'sol/component/locale/LocaleButton';
import {useServerError} from 'sol/component/message';
import {useCurrent, useHandleCurrent} from 'sol/component/session';
import {ThemeTypeButton} from 'sol/component/theme/ThemeTypeButton';
import {TOP_MENU_TEXT} from 'sol/locale/component/menu';
import {EMPTY, ErrorHandler} from 'sol/util';
import {useAnchor} from 'sol/util/hook';
import {ChildrenProps} from 'sol/util/props';

export function TopMenu(props: ChildrenProps): JSX.Element {
  const curr = useCurrent();
  const [anchor, setAnchor, resetAnchor] =
    useAnchor<MouseEvent<HTMLButtonElement>, HTMLButtonElement>();
  const handler = useServerError();
  const handleSignOut = signOut(useHandleCurrent(), handler);

  const locale = useLocale();
  const [text, setText] = useState(TOP_MENU_TEXT);
  useEffect(
    () => {
      switch (locale) {
        case 'en':
          import('sol/locale/component/menu/en')
            .then(mdl => setText(mdl.TOP_MENU_TEXT))
            .catch(console.log);
          break;
        case 'cmn-Hans':
          import('sol/locale/component/menu/cmn-Hans')
            .then(mdl => setText(mdl.TOP_MENU_TEXT))
            .catch(console.log);
          break;
      }
    },
    [locale],
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {props.children}
        <LocaleButton />
        <ThemeTypeButton />
        <div>
          <IconButton onClick={setAnchor}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchor} keepMounted
            open={anchor !== undefined}
            onClose={resetAnchor}
          >
            <MenuItem onClick={resetAnchor}>
              <strong>{curr ? curr.name : EMPTY}</strong>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>{text.account.signOut}</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

function signOut(
  handleCurrent: () => void,
  handler: ErrorHandler,
): () => void {
  return () => {
    logout()
      .then(handleCurrent)
      .catch(handler);
  };
}
