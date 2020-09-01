import {Snackbar, SnackbarProps} from '@material-ui/core';
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Message, MessageQueueContext} from 'sol/component/message';
import {ExcludeKey} from 'sol/util';
import {useSwitch} from 'sol/util/hook';

export function MessageSnackbar(
  props: ExcludeKey<SnackbarProps, SnackbarPropsExclude>,
): JSX.Element {
  const [open, switchOpen] = useSwitch(false);
  const [len, , pop] = useContext(MessageQueueContext);
  const [msg, setMsg] = useState<Message | undefined>(undefined);

  useEffect(
    () => {
      if (len) {
        if (!open) {
          setMsg(pop());
        }
        switchOpen();
      }
    },
    [open, switchOpen, len, pop],
  );

  return (
    <Snackbar
      message={msg !== undefined ? msg.content : undefined}
      key={msg !== undefined ? msg.key : undefined}
      open={open}
      onClose={
        (event, reason) => {
          if (reason == 'clickaway') {
            return;
          }
          switchOpen();
        }
      }
      onExited={() => setMsg(undefined)}
      autoHideDuration={6000}
      {...props}
    />
  );
}

type SnackbarPropsExclude =
  | 'message'
  | 'key'
  | 'open'
  | 'onClose'
  | 'onExited'
  | 'autoHideDuration';
