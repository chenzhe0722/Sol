import * as React from 'react';
import {useEffect, useState} from 'react';
import {useCurrent} from 'sol/component/session';
import {EMPTY} from 'sol/util';

export function App(): JSX.Element {
  const curr = useCurrent();
  const [app, setApp] = useState<JSX.Element>(<></>);

  useEffect(
    () => {
      if (curr !== undefined) {
        switch (curr.name) {
          case EMPTY:
            import('sol/page/LoginApp')
              .then(mdl => setApp(<mdl.LoginApp />))
              .catch(console.log);
            break;
          default:
            import('sol/page/IndexApp')
              .then(mdl => setApp(<mdl.IndexApp />))
              .catch(console.log);
            break;
        }
      }
    },
    [curr],
  );
  return app;
}
