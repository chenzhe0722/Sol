import {createContext, useContext} from 'react';
import {doNothing} from 'sol/util';

export type Locale = 'cmn-Hans' | 'en';

export function useLocale(): Locale {
  const [locale] = useContext(LocaleContext);
  return locale;
}

export const LocaleContext =
  createContext<[Locale, (locale: Locale) => void]>(['en', doNothing]);
