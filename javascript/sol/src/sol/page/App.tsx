import * as React from 'react';
import {useContext, useEffect} from 'react';
import {loginState} from 'sol/api/auth/security';
import {LoginContext} from 'sol/component/login';
import {useServerError} from 'sol/component/message';
import {IndexApp} from 'sol/page/IndexApp';
import {LoginApp} from 'sol/page/LoginApp';

export function App(): JSX.Element {
  const [login, setLogin] = useContext(LoginContext);
  const handler = useServerError();

  useEffect(
    () => {
      loginState()
        .then(state => setLogin(state.exists))
        .catch(handler);
    },
    [setLogin, handler],
  );

  if (login === true) {
    return (<IndexApp />);
  } else if (login === false) {
    return (<LoginApp />);
  } else {
    return (<></>);
  }
}
