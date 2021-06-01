import {useReducer, useState} from 'react';
import {ChildrenProps} from 'sol/util/props';
import * as React from 'react';
import {current, CurrentView} from 'sol/api/auth/session';
import {useServerError} from 'sol/component/message';
import {CurrentContext} from 'sol/component/session';


export function CsrfProvider(props: ChildrenProps): JSX.Element {
  const handler = useServerError();
  const [curr, setCurr] = useState<CurrentView | undefined>(undefined);
  const handleCurr = () => current().then(setCurr).catch(handler);
  const [, handleCurrent] = useReducer(handleCurr, undefined, handleCurr);
  return (
    <CurrentContext.Provider value={[curr, handleCurrent]}>
      {props.children}
    </CurrentContext.Provider>
  );
}