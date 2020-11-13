import * as React from 'react';
import {useReducer, useState} from 'react';
import {loginState} from 'sol/api/auth/security';
import {LoginContext} from 'sol/component/login';
import {useServerError} from 'sol/component/message';
import {ChildrenProps} from 'sol/util/props';

export function LoginProvider(props: ChildrenProps): JSX.Element {
  const handler = useServerError();
  const [login, setLogin] = useState<boolean | undefined>(undefined);
  const handleLoginState = () => {
    loginState().then(state => setLogin(state.exists)).catch(handler);
  };
  const [, handleLogin] = useReducer(handleLoginState, undefined, handleLoginState);
  return (
    <LoginContext.Provider value={[login, handleLogin]}>
      {props.children}
    </LoginContext.Provider>
  );
}
