import * as React from 'react';
import {useState} from 'react';
import {Locale, LocaleContext} from 'sol/component/locale';
import {ChildrenProps} from 'sol/util/props';

export function LocaleProvider(props: ChildrenProps): JSX.Element {
  return (
    <LocaleContext.Provider value={useState<Locale>('en')}>
      {props.children}
    </LocaleContext.Provider>
  );
}
