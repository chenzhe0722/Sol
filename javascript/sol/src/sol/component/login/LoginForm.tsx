import {Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {login} from 'sol/api/auth/security';
import {check, register} from 'sol/api/auth/sign-up';
import {useLocale} from 'sol/component/locale';
import {useHandleLogin} from 'sol/component/login';
import {MessagePusher, useMessagePush, useServerError} from 'sol/component/message';
import {useOutlinedColor} from 'sol/component/theme';
import {LOGIN_TEXT} from 'sol/locale/component/login';
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
  const handleSignIn = signIn(useHandleLogin(), push, handler);

  const locale = useLocale();
  const [text, setText] = useState(LOGIN_TEXT);
  useEffect(
    () => {
      switch (locale) {
        case 'en':
          import('sol/locale/component/login/en')
            .then(mdl => setText(mdl.LOGIN_TEXT))
            .catch(handler);
          break;
        case 'cmn-Hans':
          import('sol/locale/component/login/cmn-Hans')
            .then(mdl => setText(mdl.LOGIN_TEXT))
            .catch(handler);
          break;
      }
    },
    [locale, handler],
  );

  const styles = useStyles();
  return (
    <>
      <form className={styles.form}>
        <TextField
          variant="filled" fullWidth
          margin="normal"
          label="Name" required
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          variant="filled" fullWidth
          margin="normal"
          label="Password" required
          type="password"
          onChange={(event) => setPwd(event.target.value)}
        />
        <Grid container spacing={2} className={styles.button}>
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
      </form>
      <Dialog open={dialogOpen} onClose={switchDialogOpen}>
        <DialogTitle>
          Confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text.dialog(name)}
          </DialogContentText>
          <TextField
            variant="outlined" fullWidth
            margin="dense"
            label="Password" required
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
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary" disableElevation
            onClick={
              () =>
                handleConfirm(name, pwd, cfm, text.success, text.inconsistent)
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(
  ({spacing}) =>
    createStyles({
      form: {margin: spacing(0, 8)},
      button: {marginTop: spacing(2)},
    }),
);

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
        {name: name, password: pwd, alias: name},
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
  handleLogin: () => void,
  push: MessagePusher,
  handler: ErrorHandler,
): SignInFunc {
  return (name, pwd, invalid) => {
    if (name != EMPTY && pwd != EMPTY) {
      login({name: name, password: pwd})
        .then(handleLogin)
        .catch(handler);
    } else {
      push(invalid, 'ERROR');
    }
  };
}
