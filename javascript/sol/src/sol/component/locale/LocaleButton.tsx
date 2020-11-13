import {IconButton, IconButtonProps, Menu, MenuItem} from '@material-ui/core';
import {Translate} from '@material-ui/icons';
import * as React from 'react';
import {useContext} from 'react';
import {Locale, LocaleContext} from 'sol/component/locale';
import {ExcludeKey} from 'sol/util';
import {useSwitch} from 'sol/util/hook';

export function LocaleButton(
  props: ExcludeKey<IconButtonProps, 'onClick'>,
): JSX.Element {
  const [open, switchOpen] = useSwitch(false);
  const [, setLocale] = useContext(LocaleContext);
  return (
    <div>
      <IconButton onClick={switchOpen} {...props}>
        <Translate />
      </IconButton>
      <Menu open={open}>
        <LocaleItem
          locale={'cmn-Hans'}
          tag={'简体中文'}
          switchOpen={switchOpen}
          setLocale={setLocale}
        />
        <LocaleItem
          locale={'en'}
          tag={'English'}
          switchOpen={switchOpen}
          setLocale={setLocale}
        />
      </Menu>
    </div>
  );
}

function LocaleItem(props: LocaleItemProps): JSX.Element {
  const event = () => {
    props.setLocale(props.locale);
    props.switchOpen();
  };
  return (
    <MenuItem onClick={event}>{props.tag}</MenuItem>
  );
}

type LocaleItemProps = {
  locale: Locale,
  tag: string,
  switchOpen: () => void,
  setLocale: (locale: Locale) => void,
};
