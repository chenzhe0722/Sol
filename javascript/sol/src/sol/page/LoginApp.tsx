import {Box, Grid, Paper, Typography} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {bingImageUrl, UNSPLASH_IMAGE_URL} from 'sol/api/external/image';
import {useLocale} from 'sol/component/locale';
import {LocaleButton} from 'sol/component/locale/LocaleButton';
import {MessageSnackbar} from 'sol/component/message/MessageSnackbar';
import {LoginForm} from 'sol/component/session/LoginForm';
import {useOutlinedColor, useThemeType} from 'sol/component/theme';
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

  const bright = useThemeType() ? '100%' : '50%';

  return (
    <>
      <Grid container component="main" sx={{height: '100vh', weight: '100vw'}}>
        <Grid
          item xs={false} sm={4} md={7}
          sx={{
            height: '100%',
            weight: '100%',
            backgroundImage: useExtImgUrl(),
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: `brightness(${bright})`,
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              height: '100%',
              weight: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{display: 'flex'}}>
              <LocaleButton color={useOutlinedColor()} />
              <ThemeTypeButton color={useOutlinedColor()} />
            </Box>
            <Typography component="h1" variant="h5">{text.welcome}</Typography>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
      <MessageSnackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      />
    </>
  );
}

function useExtImgUrl(): string | undefined {
  const [image, setImage] = useState<string | undefined>(undefined);
  const setUrlImage = (url: string) => setImage(`url(${url})`);

  useEffect(
    () => {
      bingImageUrl()
        .then(setUrlImage)
        .catch(err => {
          console.log(err);
          setUrlImage(UNSPLASH_IMAGE_URL);
        });
    },
    [],
  );

  return image;
}
