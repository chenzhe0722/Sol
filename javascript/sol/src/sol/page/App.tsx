import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLogin} from 'sol/component/login';
import {useServerError} from 'sol/component/message';

export function App(): JSX.Element {
  const login = useLogin();
  const [app, setApp] = useState<JSX.Element>(<></>);
  const handler = useServerError();

  useEffect(
    () => {
      switch (login) {
        case true:
          import('sol/page/IndexApp')
            .then(mdl => setApp(<mdl.IndexApp />))
            .catch(handler);
          break;
        case false:
          import('sol/page/LoginApp')
            .then(mdl => setApp(<mdl.LoginApp />))
            .catch(handler);
          break;
      }
    },
    [login, handler],
  );
  return app;
}
