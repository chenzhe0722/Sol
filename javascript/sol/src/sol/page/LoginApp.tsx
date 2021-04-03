import {Grid, Paper, Typography} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ExternalImage} from 'sol/component/image/ExternalImage';
import {useLocale} from 'sol/component/locale';
import {LocaleButton} from 'sol/component/locale/LocaleButton';
import {MessageSnackbar} from 'sol/component/message/MessageSnackbar';
import {LoginForm} from 'sol/component/session/LoginForm';
import {useOutlinedColor} from 'sol/component/theme';
import {ThemeTypeButton} from 'sol/component/theme/ThemeTypeButton';
import {LOGIN_APP_TEXT} from 'sol/locale/page';

export function LoginApp(): JSX.Element {
  const locale = useLocale();

  const [text, setText] = useState(LOGIN_APP_TEXT);
  useEffect(
    () => {
      switch (locale) {
        case 'en':
          import('sol/locale/page/en')
            .then(mdl => setText(mdl.LOGIN_APP_TEXT))
            .catch(console.log);
          break;
        case 'cmn-Hans':
          import('sol/locale/page/cmn-Hans')
            .then(mdl => setText(mdl.LOGIN_APP_TEXT))
            .catch(console.log);
          break;
      }
    },
    [locale],
  );

  const styles = useStyles();
  return (
    <>
      <Grid container component="main" className={styles.root}>
        <Grid item sm={4} md={7}>
          <ExternalImage />
        </Grid>
        <Grid
          item xs={12} sm={8} md={5} component={Paper}
          elevation={6} square className={styles.paper}
        >
          <div className={styles.button}>
            <LocaleButton color={useOutlinedColor()} />
            <ThemeTypeButton color={useOutlinedColor()} />
          </div>
          <Typography component="h1" variant="h5">{text.welcome}</Typography>
          <LoginForm />
        </Grid>
      </Grid>
      <MessageSnackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      />
    </>
  );
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: '100vh',
      weight: '100vw',
    },
    paper: {
      height: '100%',
      weight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      display: 'flex',
    },
  }),
);
