import {createStyles} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {BackgroundImageProperty, StandardLonghandProperties} from 'csstype';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {bingImageUrl, UNSPLASH_IMAGE_URL} from 'sol/api/external/image';
import {useThemeType} from 'sol/component/theme';
import {ChildrenProps} from 'sol/util/props';

export function ExternalImage(props: ChildrenProps): JSX.Element {
  const [image, setImage] =
    useState<BackgroundImageProperty | undefined>(undefined);
  const setUrlImage = (url: string) => setImage('url(' + url + ')');

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

  const styles = useStyles({
    backgroundImage: image,
    opacity: useThemeType() ? 0 : 0.5,
  });
  return (
    <div className={styles.cover}>
      <div className={styles.mask}>
        {props.children}
      </div>
    </div>
  );
}

const useStyles = makeStyles<Theme, StandardLonghandProperties>(
  ({palette}) =>
    createStyles({
      cover: ({backgroundImage}) => ({
        height: '100%',
        weight: '100%',
        backgroundImage: backgroundImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }),
      mask: ({opacity}) => ({
        height: '100%',
        weight: '100%',
        backgroundColor: palette.common.black,
        opacity: opacity,
      }),
    }),
);
