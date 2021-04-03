import {ReactNode} from 'react';

export type TopMenuText = {
  account: AccountText,
};

type AccountText = {
  signOut: ReactNode,
};

export const TOP_MENU_TEXT: TopMenuText = {
  account: {
    signOut: undefined,
  },
};
