import {Translate} from '@mui/icons-material';
import {IconButton, IconButtonProps, Menu, MenuItem} from '@mui/material';
import * as React from 'react';
import {MouseEvent, useContext} from 'react';
import {Locale, LocaleContext} from 'sol/component/locale';
import {ExcludeKey} from 'sol/util';
import {useAnchor} from 'sol/util/hook';

export function LocaleButton(
  props: ExcludeKey<IconButtonProps, 'onClick'>,
): JSX.Element {
  const [anchor, setAnchor, resetAnchor] =
    useAnchor<MouseEvent<HTMLButtonElement>, HTMLButtonElement>();
  const [locale, setLocale] = useContext(LocaleContext);
  return (
    <div>
      <IconButton onClick={setAnchor} {...props}>
        <Translate />
      </IconButton>
      <Menu
        anchorEl={anchor} keepMounted
        open={anchor !== undefined}
        onClose={resetAnchor}
      >
        {
          LOCALE_OPTIONS.map((item) =>
            <LocaleItem
              key={item.locale}
              locale={item.locale}
              tag={item.tag}
              curr={locale}
              switchOpen={resetAnchor}
              setLocale={setLocale}
            />)
        }
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
    <MenuItem
      selected={props.locale === props.curr}
      onClick={event}
    >
      {props.tag}
    </MenuItem>
  );
}

type LocaleItemInfo = {
  locale: Locale,
  tag: string,
};

type LocaleItemProps = LocaleItemInfo & {
  curr: Locale,
  switchOpen: () => void,
  setLocale: (locale: Locale) => void,
};

const LOCALE_OPTIONS: LocaleItemInfo[] = [
  {locale: 'cmn-Hans', tag: '简体中文'},
  {locale: 'en', tag: 'English'},
];
