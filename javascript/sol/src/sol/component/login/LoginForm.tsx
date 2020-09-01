import {Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {useCallback, useContext, useState} from 'react';
import {login, loginState} from 'sol/api/auth/security';
import {check, register} from 'sol/api/auth/sign-up';
import {LoginContext} from 'sol/component/login';
import {useMessagePush, useServerError} from 'sol/component/message';
import {useOutlinedColor} from 'sol/component/theme';
import {EMPTY} from 'sol/util';
import {useSwitch} from 'sol/util/hook';

export function LoginForm(): JSX.Element {
  const [name, setName] = useState(EMPTY);
  const [pwd, setPwd] = useState(EMPTY);
  const [cfm, setCfm] = useState(EMPTY);

  const [dialogOpen, switchDialogOpen] = useSwitch(false);

  const signUp = useSignUp(switchDialogOpen);
  const handleSignUp = useCallback(
    () => signUp(name, pwd),
    [name, pwd, signUp],
  );

  const confirm = useConfirm(switchDialogOpen);
  const handleConfirm = useCallback(
    () => confirm(name, pwd, cfm),
    [name, pwd, cfm, confirm],
  );

  const signIn = useSignIn();
  const handleSignIn = useCallback(
    () => signIn(name, pwd),
    [name, pwd, signIn],
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
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained" fullWidth
              color="primary" disableElevation
              onClick={handleSignIn}
            >
              Sign In
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
            <p>
              You are signing up for account <strong>{name}</strong>.
              Account name <strong>CAN NOT</strong> be modified after signing
              up, but alias can.
            </p>
            <p>
              Please enter password again.
            </p>
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
            onClick={handleConfirm}
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
      form: {
        margin: spacing(0, 8),
      },
      button: {
        marginTop: spacing(2),
      },
    }),
);

function useSignUp(
  switchDialogOpen: () => void,
): (name: string, pwd: string) => void {
  const push = useMessagePush();
  const handler = useServerError();

  return (name, pwd) => {
    if (name != EMPTY && pwd != EMPTY) {
      check(
        {name: name},
      ).then(
        res => {
          if (res.exists) {
            push({
              content:
                <>Name <strong>{name}</strong> has already been occupied.</>,
              type: 'ERROR',
            });
          } else {
            switchDialogOpen();
          }
        },
      ).catch(handler);
    } else {
      push({
        content: <>Name or password <strong>CAN NOT</strong> be empty.</>,
        type: 'ERROR',
      });
    }
  };
}

function useConfirm(
  switchDialogOpen: () => void,
): (name: string, pwd: string, cfm: string) => void {
  const push = useMessagePush();
  const handler = useServerError();

  return (name, pwd, cfm) => {
    if (pwd == cfm) {
      register(
        {name: name, password: pwd, alias: name},
      ).then(
        () => {
          push({
            content: <>Sign up successfully.</>,
            type: 'SUCCESS',
          });
          switchDialogOpen();
        },
      ).catch(handler);
    } else {
      push({
        content:
          <>Password <strong>IS NOT</strong> consistent with the one before.</>,
        type: 'ERROR',
      });
    }
  };
}

function useSignIn(): (name: string, pwd: string) => void {
  const push = useMessagePush();
  const [, setLogin] = useContext(LoginContext);
  const handler = useServerError();

  return (name, pwd) => {
    if (name != EMPTY && pwd != EMPTY) {
      login({name: name, password: pwd})
        .then(loginState)
        .then(res => setLogin(res.exists))
        .catch(handler);
    } else {
      push({
        content: <>Name or password <strong>CAN NOT</strong> be empty.</>,
        type: 'ERROR',
      });
    }
  };
}
