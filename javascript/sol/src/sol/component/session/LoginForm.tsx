import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField} from '@mui/material';
import * as React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {login} from 'sol/api/auth/security';
import {check, register} from 'sol/api/auth/sign-up';
import {useLocale} from 'sol/component/locale';
import {MessagePusher, useMessagePush, useServerError} from 'sol/component/message';
import {useHandleCurrent} from 'sol/component/session';
import {useOutlinedColor} from 'sol/component/theme';
import {LOGIN_TEXT} from 'sol/locale/component/session';
import {EMPTY, ErrorHandler} from 'sol/util';
import {useSwitch} from 'sol/util/hook';

export function LoginForm(): JSX.Element {
  const [name, setName] = useState(EMPTY);
  const [pwd, setPwd] = useState(EMPTY);
  const [cfm, setCfm] = useState(EMPTY);

  const [dialogOpen, switchDialogOpen] = useSwitch(false);
  const push = useMessagePush();
  const handler = useServerError();

  const handleSignUp = signUp(switchDialogOpen, push, handler);
  const handleConfirm = confirm(switchDialogOpen, push, handler);
  const handleSignIn = signIn(useHandleCurrent(), push, handler);

  const locale = useLocale();
  const [text, setText] = useState(LOGIN_TEXT);
  useEffect(
    () => {
      switch (locale) {
        case 'en':
          import('sol/locale/component/session/en')
            .then(mdl => setText(mdl.LOGIN_TEXT))
            .catch(console.log);
          break;
        case 'cmn-Hans':
          import('sol/locale/component/session/cmn-Hans')
            .then(mdl => setText(mdl.LOGIN_TEXT))
            .catch(console.log);
          break;
      }
    },
    [locale],
  );

  return (
    <>
      <Box sx={{margin: (theme) => theme.spacing(0, 8)}}>
        <TextField
          variant="filled" fullWidth
          margin="normal"
          label={text.name} required
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          variant="filled" fullWidth
          margin="normal"
          label={text.password} required
          type="password"
          onChange={(event) => setPwd(event.target.value)}
        />
        <Grid container spacing={2} sx={{margin: (theme) => theme.spacing(2)}}>
          <Grid item xs={6}>
            <Button
              variant="outlined" fullWidth
              color={useOutlinedColor()} disableElevation
              onClick={
                () => handleSignUp(name, pwd, text.invalid, text.occupied(name))
              }
            >
              {text.signUp}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained" fullWidth
              color="primary" disableElevation
              onClick={() => handleSignIn(name, pwd, text.invalid)}
            >
              {text.signIn}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={dialogOpen} onClose={switchDialogOpen}>
        <DialogTitle>
          {text.confirm}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text.dialog(name)}
          </DialogContentText>
          <TextField
            variant="outlined" fullWidth
            margin="dense"
            label={text.password} required
            type="password" autoFocus
            onChange={(event) => setCfm(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color={useOutlinedColor()} disableElevation
            onClick={switchDialogOpen}
          >
            {text.cancel}
          </Button>
          <Button
            variant="contained"
            color="primary" disableElevation
            onClick={
              () =>
                handleConfirm(name, pwd, cfm, text.success, text.inconsistent)
            }
          >
            {text.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type SignUpFunc =
  (name: string, pwd: string, invalid: ReactNode, occupied: ReactNode) => void;
type ConfirmFunc = (
  name: string, pwd: string, cfm: string,
  success: ReactNode, inconsistent: ReactNode,
) => void;
type SignInFunc = (name: string, pwd: string, invalid: ReactNode) => void;

function signUp(
  switchDialogOpen: () => void,
  push: MessagePusher,
  handler: ErrorHandler,
): SignUpFunc {
  return (name, pwd, invalid, occupied) => {
    if (name != EMPTY && pwd != EMPTY) {
      check(
        {name: name},
      ).then(
        res => {
          if (res.exists) {
            push(occupied, 'ERROR');
          } else {
            switchDialogOpen();
          }
        },
      ).catch(handler);
    } else {
      push(invalid, 'ERROR');
    }
  };
}

function confirm(
  switchDialogOpen: () => void,
  push: MessagePusher,
  handler: ErrorHandler,
): ConfirmFunc {
  return (name, pwd, cfm, success, inconsistent) => {
    if (pwd == cfm) {
      register(
        {name: name, password: pwd},
      ).then(
        () => {
          push(success, 'SUCCESS');
          switchDialogOpen();
        },
      ).catch(handler);
    } else {
      push(inconsistent, 'ERROR');
    }
  };
}

function signIn(
  handleCurrent: () => void,
  push: MessagePusher,
  handler: ErrorHandler,
): SignInFunc {
  return (name, pwd, invalid) => {
    if (name != EMPTY && pwd != EMPTY) {
      login({name: name, password: pwd})
        .then(handleCurrent)
        .catch(handler);
    } else {
      push(invalid, 'ERROR');
    }
  };
}
