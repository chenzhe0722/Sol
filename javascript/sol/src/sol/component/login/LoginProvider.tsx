import * as React from 'react';
import {useState} from 'react';
import {LoginContext} from 'sol/component/login';
import {ChildrenProps} from 'sol/util/props';

export function LoginProvider(props: ChildrenProps): JSX.Element {
  return (
    <LoginContext.Provider value={useState<boolean | undefined>(undefined)}>
      {props.children}
    </LoginContext.Provider>
  );
}
